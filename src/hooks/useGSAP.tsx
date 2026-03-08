import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Modern GSAP animation hook with automatic cleanup
 */
export function useGSAP<T extends HTMLElement = HTMLDivElement>(
  callback: (ctx: gsap.Context, element: T) => void,
  deps: React.DependencyList = []
) {
  const elementRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      callback(gsap.context(() => {}), elementRef.current!);
    }, elementRef);

    return () => ctx.revert();
  }, deps);

  return elementRef;
}

/**
 * Text split animation - reveals text character by character
 */
export function useTextReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    trigger?: boolean;
  } = {}
) {
  const {
    delay = 0,
    duration = 1,
    stagger = 0.03,
    ease = 'power4.out',
    trigger = true
  } = options;

  const elementRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const text = element.textContent || '';
    
    // Split text into spans
    element.innerHTML = text
      .split('')
      .map(char => char === ' ' ? ' ' : `<span class="gsap-char" style="display:inline-block;opacity:0;transform:translateY(100%)">${char}</span>`)
      .join('');

    const chars = element.querySelectorAll('.gsap-char');

    const animation = gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      delay,
      scrollTrigger: trigger ? {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none'
      } : undefined
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay, duration, stagger, ease, trigger]);

  return elementRef;
}

/**
 * Fade in animation with scroll trigger
 */
export function useFadeIn<T extends HTMLElement = HTMLDivElement>(
  options: {
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    distance?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  const {
    direction = 'up',
    delay = 0,
    duration = 1,
    distance = 60,
    ease = 'power3.out',
    start = 'top 85%'
  } = options;

  const elementRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    const getTransform = () => {
      switch (direction) {
        case 'up': return { y: distance, x: 0 };
        case 'down': return { y: -distance, x: 0 };
        case 'left': return { x: distance, y: 0 };
        case 'right': return { x: -distance, y: 0 };
        default: return { x: 0, y: 0 };
      }
    };

    const transform = getTransform();

    gsap.set(elementRef.current, {
      opacity: 0,
      ...transform
    });

    const animation = gsap.to(elementRef.current, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: elementRef.current,
        start,
        toggleActions: 'play none none none'
      }
    });

    return () => {
      animation.kill();
    };
  }, [direction, delay, duration, distance, ease, start]);

  return elementRef;
}

/**
 * Parallax scroll effect
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
) {
  const elementRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    const animation = gsap.to(elementRef.current, {
      [direction === 'vertical' ? 'y' : 'x']: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      animation.kill();
    };
  }, [speed, direction]);

  return elementRef;
}

/**
 * Magnetic button effect
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  strength: number = 0.3
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
}

/**
 * Stagger children animation
 */
export function useStaggerChildren<T extends HTMLElement = HTMLDivElement>(
  options: {
    childSelector?: string;
    delay?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    from?: 'start' | 'end' | 'center' | 'edges' | 'random';
  } = {}
) {
  const {
    childSelector = ':scope > *',
    delay = 0,
    duration = 0.8,
    stagger = 0.1,
    ease = 'power3.out',
    from = 'start'
  } = options;

  const containerRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll(childSelector);

    gsap.set(children, { opacity: 0, y: 40 });

    const animation = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger: {
        each: stagger,
        from
      },
      ease,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    return () => {
      animation.kill();
    };
  }, [childSelector, delay, duration, stagger, ease, from]);

  return containerRef;
}

/**
 * Horizontal scroll section
 */
export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !innerRef.current) return;

    const scrollWidth = innerRef.current.scrollWidth - window.innerWidth;

    const animation = gsap.to(innerRef.current, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    return () => {
      animation.kill();
    };
  }, []);

  return { containerRef, innerRef };
}

export { gsap, ScrollTrigger };
