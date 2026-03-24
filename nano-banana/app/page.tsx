"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { products } from "../data/products";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProductBottleScroll } from "../components/ProductBottleScroll";
import { ChevronLeft, ChevronRight, Check, Droplet, ArrowRight } from "lucide-react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const product = products[currentIndex];

  const slideUpVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen selection:bg-orange-500 selection:text-white" style={{ background: product.gradient }}>
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen"
        >
          {/* Scroll Experience */}
          <ProductBottleScroll product={product} />

          {/* Details Section */}
          <motion.section 
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="py-32 px-6 md:px-12 max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">{product.detailsSection.title}</h3>
                <p className="text-xl leading-relaxed text-white/80">{product.detailsSection.description}</p>
                
                <div className="mt-12 grid grid-cols-3 gap-6">
                    {product.stats.map((stat, i) => (
                        <div key={i} className="border-l-2 pl-4" style={{ borderColor: product.themeColor }}>
                            <div className="text-3xl font-black">{stat.val}</div>
                            <div className="text-sm text-white/60 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
              </div>
              <div className="relative aspect-square bg-white/5 rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 flex items-center justify-center p-12 group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                 {/* Decorative element showcasing the theme color */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700" style={{ background: product.themeColor }} />
                 {/* Visual representation card */}
                 <div className="relative z-10 w-full h-full bg-black/40 border border-white/10 rounded-2xl flex flex-col justify-end p-8 shadow-2xl">
                     <h4 className="text-2xl font-bold">{product.freshnessSection.title}</h4>
                     <p className="mt-4 text-white/70 text-sm leading-relaxed">{product.freshnessSection.description}</p>
                 </div>
              </div>
            </div>
          </motion.section>

          {/* Buy Now Section */}
          <motion.section 
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-24 px-6 md:px-12 bg-black/50 backdrop-blur-md border-t border-white/10"
          >
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1">
                    <h2 className="text-4xl font-bold mb-2">{product.name}</h2>
                    <p className="text-xl text-white/60 mb-8">{product.subName}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-8">
                        {product.buyNowSection.processingParams.map((param, i) => (
                            <span key={i} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/5 whitespace-nowrap">
                                <Check size={16} style={{ color: product.themeColor }} />
                                {param}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-4 text-sm text-white/70">
                        <p className="flex items-start gap-3">
                            <Droplet size={20} className="shrink-0 text-gray-400" />
                            {product.buyNowSection.deliveryPromise}
                        </p>
                        <p className="flex items-start gap-3">
                            <Check size={20} className="shrink-0 text-gray-400" />
                            {product.buyNowSection.returnPolicy}
                        </p>
                    </div>
                </div>

                <div className="shrink-0 w-full md:w-auto p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center min-w-[320px]">
                    <div className="text-6xl font-black mb-2" style={{ color: product.themeColor }}>{product.buyNowSection.price}</div>
                    <div className="text-white/50 mb-8 uppercase tracking-widest text-sm">{product.buyNowSection.unit}</div>
                    
                    <button className="w-full py-4 rounded-xl text-black font-bold text-lg transition-transform hover:scale-105" style={{ background: product.themeColor }}>
                        Add to Cart
                    </button>
                    <button className="w-full py-4 mt-3 rounded-xl text-white font-medium hover:bg-white/10 transition-colors border border-transparent hover:border-white/20">
                        Subscribe & Save 15%
                    </button>
                </div>
            </div>
          </motion.section>

          {/* Next Flavor Button */}
          <div className="py-20 flex justify-center bg-black">
              <button 
                onClick={nextProduct}
                className="group flex flex-col items-center gap-4 hover:opacity-80 transition-opacity"
              >
                  <span className="text-white/50 uppercase tracking-widest text-sm font-semibold group-hover:text-white transition-colors">Continue the journey</span>
                  <div className="flex items-center gap-6 px-12 py-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-all">
                      <span className="text-2xl font-bold">Try {products[(currentIndex + 1) % products.length].name}</span>
                      <ArrowRight size={28} style={{ color: product.themeColor }} />
                  </div>
              </button>
          </div>

          <Footer />
        </motion.div>
      </AnimatePresence>

      {/* Fixed Navigation Arrows */}
      <div className="fixed top-1/2 -translate-y-1/2 left-4 md:left-8 z-40 hidden md:block">
        <button 
            onClick={prevProduct}
            className="p-4 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-110"
        >
            <ChevronLeft size={24} />
        </button>
      </div>
      <div className="fixed top-1/2 -translate-y-1/2 right-4 md:right-8 z-40 hidden md:block">
        <button 
            onClick={nextProduct}
            className="p-4 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-110"
        >
            <ChevronRight size={24} />
        </button>
      </div>

      {/* Fixed Bottom Menu Pill */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <div className="flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-2 gap-2 shadow-2xl">
              {products.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        currentIndex === idx 
                          ? "bg-white text-black shadow-lg" 
                          : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                      {p.name.split(" ")[1] || p.name}
                  </button>
              ))}
          </div>
      </div>
    </main>
  );
}
