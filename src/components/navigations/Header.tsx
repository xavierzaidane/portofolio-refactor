import { motion } from 'motion/react'

function Header() {
  return (
    <header className="top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-start pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
          />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[15px] font-mono tracking-[0.2em] uppercase text-white/60"
          >
            Available for work
          </motion.span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-6 pointer-events-auto"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[15px] font-mono tracking-[0.2em] uppercase text-white/60"
          >
            Based in Indonesia [UTC+7]
          </motion.div>       
        </motion.div>
      </header>
  )
}

export default Header