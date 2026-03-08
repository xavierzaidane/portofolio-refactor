import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const statusDotRef = useRef<HTMLDivElement>(null)
  const statusTextRef = useRef<HTMLSpanElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!headerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        }
      })

      // Set initial states
      gsap.set([statusDotRef.current, statusTextRef.current, locationRef.current], {
        opacity: 0,
        y: 30,
      })
      gsap.set(statusDotRef.current, {
        scale: 0,
      })
      gsap.set(borderRef.current, {
        scaleX: 0,
        transformOrigin: 'left center'
      })

      // Animate border line
      tl.to(borderRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut'
      })

      // Animate status dot with elastic bounce
      .to(statusDotRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.8')

      // Animate status text with character split effect
      .to(statusTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')

      // Animate location
      .to(locationRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')

      // Add subtle pulse animation to status dot
      gsap.to(statusDotRef.current, {
        boxShadow: '0 0 16px rgba(34, 197, 94, 0.8)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
      })

    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <header 
      ref={headerRef}
      className="relative top-0 left-0 w-full z-50 px-4 md:px-6 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 pointer-events-none"
    >
      {/* Animated border */}
      <div 
        ref={borderRef}
        className="absolute bottom-0 left-0 w-full h-px bg-foreground/10"
      />
      
      <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
        <div 
          ref={statusDotRef}
          className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
        />
        <span 
          ref={statusTextRef}
          className="text-xs md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-foreground/60 dark:text-foreground/60"
        >
          Available for work
        </span>
      </div>

      <div className="flex items-center gap-3 md:gap-6 pointer-events-auto">
        <div 
          ref={locationRef}
          className="text-xs md:text-[15px] font-mono tracking-wide md:tracking-widest uppercase text-foreground/60 dark:text-foreground/60"
        >
          Based in Indonesia [UTC+7]
        </div>
      </div>
    </header>
  )
}

export default Header