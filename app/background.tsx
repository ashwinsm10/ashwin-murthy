import { motion, useScroll, useTransform } from "framer-motion";

export const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  
  // Simple vertical movement as you scroll
  const y = useTransform(scrollY, [0, 1000], [0, -300]);
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      {/* Background image with parallax effect */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/bg.jpg')",
            height: "150%", 
            width: "100%",
          }}
        />
      </motion.div>

      {/* Optional overlay for even smoother text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/60" />
    </div>
  );
};
