"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, motion, MotionValue } from "framer-motion";
import { Product } from "../data/products";
import { ProductTextOverlays } from "./ProductTextOverlays";

interface ProductBottleScrollProps {
  product: Product;
}

const FRAME_COUNT = 120;

export function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${product.folderPath}/${i}.webp`;
      img.onload = () => {
        loadedCount++;
        if (isMounted) setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }

    if (isMounted) setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, [product.folderPath]);

  // Draw canvas frame based on scroll
  useEffect(() => {
    if (images.length === 0 || imagesLoaded < FRAME_COUNT * 0.2) return; // Wait for at least 20% to start showing
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let renderTask: number;

    const render = () => {
      const progress = scrollYProgress.get();
      // Map progress (0 to 1) to frame index (0 to 119)
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(progress * FRAME_COUNT))
      );

      const img = images[frameIndex];
      // Only draw if image is loaded, else use nearest available
      if (img && img.complete) {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // "contain" sizing logic
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(
          img,
          0, 0, img.width, img.height,
          centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
        );
      }
    };

    // Initial render
    render();

    // Subscribe to scroll changes
    const unsubscribe = scrollYProgress.on("change", () => {
        renderTask = requestAnimationFrame(render);
    });

    // Handle resize
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Init size

    return () => {
      unsubscribe();
      cancelAnimationFrame(renderTask);
      window.removeEventListener("resize", handleResize);
    };
  }, [images, imagesLoaded, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full" style={{ background: product.gradient }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* The 3D/Image Sequence Layer */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />

        {/* The UI Typography Layer */}
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
             <ProductTextOverlays product={product} progress={scrollYProgress} />
        </div>
        
        {/* Loading Indicator */}
        {imagesLoaded < FRAME_COUNT && (
            <div className="absolute bottom-8 left-8 text-white/50 text-sm font-mono tracking-widest uppercase z-30">
                Loading Assets: {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
            </div>
        )}
      </div>
    </div>
  );
}
