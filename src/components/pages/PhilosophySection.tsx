import { useRef, useLayoutEffect } from 'react'
import { PHILOSOPHY } from '@/data/philosophy'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 20 })
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        })
      }

      // Animate items with stagger
      itemsRef.current.forEach((item, index) => {
        if (!item) return

        gsap.set(item, { opacity: 0, y: 40 })
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        })

        // Hover animation
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          })
        })

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="philosophy" className="container mx-auto px-20 py-24">
      {/* Header */}
      <div
        ref={headerRef}
        className="mb-16 flex items-center justify-between border-b border-foreground/10 dark:border-white/10 pb-6"
      >
        <span className="text-sm font-mono uppercase text-foreground/60">
          Core Philosophy
        </span>
        <span className="text-sm font-mono uppercase text-foreground/60">
          03 — Attributes
        </span>
      </div>

      {/* Items */}
      <div className="flex flex-col">
        {PHILOSOPHY.map((item, idx) => (
          <div
            key={item.title}
            ref={(el) => {
              itemsRef.current[idx] = el
            }}
            className="group relative border-b border-foreground/10 dark:border-white/10 py-12 transition-all duration-500"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Section - Number & Title */}
              <div className="flex flex-col gap-4 lg:col-span-5">
                <span className="font-mono text-foreground/40 dark:text-white/40 text-sm">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-medium text-5xl md:text-6xl lg:text-7xl text-foreground dark:text-white tracking-tighter leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* Right Section - Category & Description */}
              <div className="flex flex-col justify-end gap-8 lg:col-span-7">
                <div className="max-w-2xl">
                  <h4 className={`mb-4 font-mono text-sm uppercase tracking-wider ${item.color}`}>
                    {item.category}
                  </h4>
                  <p className="font-light text-foreground/60 dark:text-white/60 text-sm md:text-xl leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Philosophy