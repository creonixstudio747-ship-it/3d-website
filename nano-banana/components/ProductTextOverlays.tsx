"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Product } from "../data/products";

interface ProductTextOverlaysProps {
  product: Product;
  progress: MotionValue<number>;
}

export function ProductTextOverlays({ product, progress }: ProductTextOverlaysProps) {
  // First Section: 0 to 0.15 (Fade in initially, fade out at 0.15)
  const opacity1 = useTransform(progress, [0, 0.1, 0.15], [1, 1, 0]);
  const y1 = useTransform(progress, [0, 0.15], [0, -50]);

  // Second Section: 0.2 to 0.4
  const opacity2 = useTransform(progress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(progress, [0.15, 0.25, 0.35, 0.45], [50, 0, 0, -50]);

  // Third Section: 0.5 to 0.7
  const opacity3 = useTransform(progress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(progress, [0.45, 0.55, 0.65, 0.75], [50, 0, 0, -50]);

  // Fourth Section: 0.8 to 1.0
  const opacity4 = useTransform(progress, [0.75, 0.85, 1], [0, 1, 1]);
  const y4 = useTransform(progress, [0.75, 0.85, 1], [50, 0, 0]);

  const baseTextClasses = "absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 pointer-events-none drop-shadow-2xl";

  return (
    <>
      {/* Section 1 */}
      <motion.div style={{ opacity: opacity1, y: y1 }} className={baseTextClasses}>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter"
        >
          {product.section1.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-2xl md:text-3xl lg:text-4xl font-medium mt-4 text-white/90"
        >
          {product.section1.subtitle}
        </motion.p>
      </motion.div>

      {/* Section 2 */}
      <motion.div style={{ opacity: opacity2, y: y2 }} className={baseTextClasses}>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-tight">
          {product.section2.title}
        </h2>
        <p className="text-xl md:text-2xl mt-6 text-white/80 max-w-2xl">
          {product.section2.subtitle}
        </p>
      </motion.div>

      {/* Section 3 */}
      <motion.div style={{ opacity: opacity3, y: y3 }} className={baseTextClasses}>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-tight">
          {product.section3.title}
        </h2>
        <p className="text-xl md:text-2xl mt-6 text-white/80 max-w-2xl">
          {product.section3.subtitle}
        </p>
      </motion.div>

      {/* Section 4 */}
      <motion.div style={{ opacity: opacity4, y: y4 }} className={baseTextClasses}>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter max-w-5xl leading-none">
          {product.section4.title}
        </h2>
        {product.section4.subtitle && (
          <p className="text-xl md:text-2xl mt-6 text-white/80 max-w-2xl">
            {product.section4.subtitle}
          </p>
        )}
      </motion.div>
    </>
  );
}
