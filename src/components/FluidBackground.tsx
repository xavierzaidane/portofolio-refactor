// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
// */

// import React, { useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { useTheme } from './theme-provider';

// const StarField = ({ isDark }: { isDark: boolean }) => {
//   const stars = useMemo(() => {
//     return Array.from({ length: 20 }).map((_, i) => ({
//       id: i,
//       size: Math.random() * 1.5 + 0.5,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       duration: Math.random() * 5 + 3,
//       delay: Math.random() * 5,
//       opacity: Math.random() * 0.5 + 0.1
//     }));
//   }, []);

//   return (
//     <div className="absolute inset-0 z-0 pointer-events-none">
//       {stars.map((star) => (
//         <motion.div
//           key={star.id}
//           className={`absolute rounded-full will-change-[opacity,transform] ${
//             isDark ? 'bg-white/40' : 'bg-gray-400/30'
//           }`}
//           style={{
//             left: `${star.x}%`,
//             top: `${star.y}%`,
//             width: star.size,
//             height: star.size,
//           }}
//           initial={{ opacity: star.opacity }}
//           animate={{
//             opacity: [star.opacity, star.opacity * 2, star.opacity],
//           }}
//           transition={{
//             duration: star.duration,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: star.delay,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const FluidBackground: React.FC = () => {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   return (
//     <div className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-300 ${
//       isDark ? 'bg-[#050505]' : 'bg-white'
//     }`}>
      
//       <StarField isDark={isDark} />

//       {/* Subtle Blobs - Theme aware */}
//       <motion.div
//         className={`absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full mix-blend-screen filter blur-[120px] will-change-transform ${
//           isDark ? 'bg-[#1a1a2e] opacity-40' : 'bg-blue-200 opacity-20'
//         }`}
//         animate={{
//           x: [0, 30, -15, 0],
//           y: [0, -15, 15, 0],
//         }}
//         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//       />

//       <motion.div
//         className={`absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen filter blur-[100px] will-change-transform ${
//           isDark ? 'bg-[#0f172a] opacity-30' : 'bg-purple-200 opacity-15'
//         }`}
//         animate={{
//           x: [0, -20, 10, 0],
//           y: [0, 20, -10, 0],
//         }}
//         transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* Grain Overlay */}
//       <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none ${
//         isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'
//       }`} />
      
//       {/* Vignette */}
//       <div className={`absolute inset-0 pointer-events-none ${
//         isDark ? 'bg-radial-gradient from-transparent via-transparent to-black/80' : 'bg-radial-gradient from-transparent via-transparent to-black/20'
//       }`} />
//     </div>
//   );
// };

// export default FluidBackground;
