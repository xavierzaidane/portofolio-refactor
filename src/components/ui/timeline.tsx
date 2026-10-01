// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  useEffect,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLenis } from "lenis/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
} as const;

export type Month = keyof typeof monthOrder;

export type JourneyItem = {
  id: string;
  year: string;
  month: Month | string;
  content: string;
};

type SplitTextInstance = InstanceType<typeof SplitText>;

export type TimelineProps = {
  id?: string;
  className?: string;
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Reveal animation duration, in seconds. */
  duration?: number;
  /** Fallback reveal duration when `duration` is omitted, in seconds. */
  scrollDuration?: number;
  topItems?: JourneyItem[];
  bottomItems?: JourneyItem[];
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

export const topJourneyData: JourneyItem[] = [
  {
    id: "2020-march",
    year: "2020",
    month: "March",
    content: "Signal research turns scattered notes into a clear product thesis",
  },
  {
    id: "2021-july",
    year: "2021",
    month: "July",
    content: "Founding release ships with the first live customer journeys",
  },
  {
    id: "2023-april",
    year: "2023",
    month: "April",
    content: "Automation layer connects insight, publishing, and sales motion",
  },
  {
    id: "2026-may",
    year: "2026",
    month: "May",
    content: "New markets open with localized launches and faster onboarding",
  },
];

export const bottomJourneyData: JourneyItem[] = [
  {
    id: "2020-november",
    year: "2020",
    month: "November",
    content: "Prototype sprint validates the experience with real operators",
  },
  {
    id: "2022-october",
    year: "2022",
    month: "October",
    content: "Community feedback reshapes the roadmap into sharper releases",
  },
  {
    id: "2025-september",
    year: "2025",
    month: "September",
    content: "Companion mobile workflows make the timeline travel-ready",
  },
];

export default function Timeline({
  id = "journey",
  className,
  title = "Product Storyline",
  periodLabel = "2020-2026",
  textColor = "var(--foreground, #ffffff)",
  mutedTextColor = "var(--muted-foreground, #a1a1aa)",
  activeColor = "#1e9df1",
  backgroundColor = "var(--background, #0a0a0a)",
  imageUrl = "https://cdn.21st.dev/assets/mirror/b0/b0c41784074f76ac5fb6b447da87780c901135841317a096241371f24bc13ddd.jpg",
  imageAlt = "Modern office workspace",
  topItems,
  bottomItems,
}: TimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const lenis = useLenis();

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  const topData = topItems ?? topJourneyData;
  const bottomData = bottomItems ?? bottomJourneyData;

  const allJourneyItems: JourneyItem[] = [
    ...topData,
    ...bottomData,
  ].sort((a, b) => {
    const yearDiff = Number(a.year) - Number(b.year);
    if (yearDiff !== 0) return yearDiff;
    const mA = (monthOrder as Record<string, number>)[a.month] || 0;
    const mB = (monthOrder as Record<string, number>)[b.month] || 0;
    return mA - mB;
  });

  // Sync GSAP ScrollTrigger with Lenis
  useEffect(() => {
    if (!lenis) return;
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useGSAP(() => {
    const section = sectionRef.current;
    const slider = wholeSliderRef.current;

    if (!section || !slider) return;

    const isMobile = window.innerWidth < 768;
    const items = allJourneyItems;
    const itemCount = items.length;

    // Calculate the horizontal travel distance needed so the last item is fully shown
    const getTravelDistance = () => {
      const overflow = slider.scrollWidth - window.innerWidth;
      return Math.max(0, overflow + (isMobile ? 60 : 120));
    };

    // Calculate vertical hold distance (how long the page pins while scrubbing)
    const getHoldDistance = () => {
      const travel = getTravelDistance();
      const minDistance = window.innerHeight * (isMobile ? 2.5 : 2.8);
      return Math.max(travel * 1.2, minDistance);
    };

    // Setup SplitText
    const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
    const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};

    items.forEach((item) => {
      try {
        titleSplits[item.id] = new SplitText(`.title-${item.id}`, {
          type: "chars, words, lines",
        });
        descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, {
          type: "lines, words",
        });
      } catch (err) {
        console.warn("SplitText fallback for item", item.id, err);
      }
    });

    const getTitleTargets = (itemId: string) => {
      const split = titleSplits[itemId];
      if (split?.lines && split.lines.length > 0) return split.lines;
      return `.title-${itemId}`;
    };

    const getDescTargets = (itemId: string) => {
      const split = descriptionSplits[itemId];
      if (split?.lines && split.lines.length > 0) return split.lines;
      return `.description-${itemId}`;
    };

    // Set initial states
    if (reducedMotion) {
      gsap.set(slider, { x: 0 });
      gsap.set(".journey-line", { width: "98%" });
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(getTitleTargets(item.id), { opacity: 1, y: 0 });
        gsap.set(getDescTargets(item.id), { opacity: 1, y: 0 });
      });
    } else {
      items.forEach((item) => {
        const isTop = topData.some((topItem) => topItem.id === item.id);
        gsap.set(`.jl-${item.id}`, {
          scaleY: 0,
          transformOrigin: isTop ? "bottom bottom" : "top top",
        });
        gsap.set(`.jd-${item.id}`, { scale: 0, transformOrigin: "center center" });
        gsap.set(getTitleTargets(item.id), { y: 40, opacity: 0 });
        gsap.set(getDescTargets(item.id), { y: 30, opacity: 0 });
      });
    }

    // Unified Master ScrollTrigger with TRUE PINNING
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        pinSpacing: true,
        start: "top top",
        end: () => `+=${getHoldDistance()}`,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      defaults: {
        ease: "none",
      },
    });

    // 1. Move slider sideways smoothly from 0 to full travel distance
    masterTl.to(
      slider,
      {
        x: () => -getTravelDistance(),
        ease: "none",
        duration: 1,
      },
      0
    );

    // 2. Animate journey line progress
    masterTl.fromTo(
      ".journey-line",
      { width: "0%" },
      { width: "98%", ease: "none", duration: 1 },
      0
    );

    // 3. Trigger each milestone's stem, dot, and text reveal as it passes through the center
    if (!reducedMotion) {
      items.forEach((item, index) => {
        const itemTime =
          itemCount <= 1
            ? 0.25
            : 0.12 + (index / (itemCount - 1)) * 0.70;

        const animDuration = 0.08;

        masterTl.to(
          `.jl-${item.id}`,
          {
            scaleY: 1,
            duration: animDuration,
            ease: "power2.out",
          },
          itemTime
        );

        masterTl.to(
          `.jd-${item.id}`,
          {
            scale: 1,
            duration: animDuration,
            ease: "back.out(2)",
          },
          itemTime
        );

        masterTl.to(
          getTitleTargets(item.id),
          {
            y: 0,
            opacity: 1,
            duration: animDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
          itemTime + 0.02
        );

        masterTl.to(
          getDescTargets(item.id),
          {
            y: 0,
            opacity: 1,
            duration: animDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
          itemTime + 0.03
        );
      });
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Refresh ScrollTrigger to calculate initial positions
    ScrollTrigger.refresh();

    return () => {
      Object.values(titleSplits).forEach((split) => split?.revert?.());
      Object.values(descriptionSplits).forEach((split) => split?.revert?.());
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [allJourneyItems.length, reducedMotion], scope: sectionRef });

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`w-full h-screen relative overflow-hidden flex items-center ${className || ""}`}
      style={sectionStyle}
    >
      <div className="w-full h-full relative flex items-center overflow-hidden">
        <div
          ref={wholeSliderRef}
          className="flex h-[75vh] items-center gap-[4vw] px-[5vw] max-[768px]:gap-[8vw] max-[768px]:px-[6vw] shrink-0"
          style={{ width: "max-content" }}
        >
          {/* Portrait / Workspace Photo */}
          <div className="h-[28vw] w-[28vw] min-h-[260px] min-w-[260px] max-h-[400px] max-w-[400px] max-[768px]:h-[65vw] max-[768px]:w-[75vw] max-[768px]:min-h-[220px] max-[768px]:min-w-[220px] overflow-hidden rounded-2xl shrink-0 border border-foreground/10 dark:border-white/10 shadow-sm">
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Timeline Track & Milestones */}
          <div className="relative h-full flex flex-col justify-between py-[2vh] shrink-0">
            {/* Center Axis Line */}
            <div className="w-full absolute left-0 top-[50%] -translate-y-1/2 flex items-center h-fit pointer-events-none z-10">
              <div
                className="size-[10px] rounded-full shrink-0"
                style={activeStyle}
              ></div>
              <div
                className="h-px w-[0%] journey-line"
                style={activeStyle}
              ></div>
              <div
                className="size-[10px] rounded-full shrink-0"
                style={activeStyle}
              ></div>
            </div>

            {/* Upper Row (Top Track) */}
            <div className="flex h-1/2 w-full items-center justify-start gap-[1vw] pb-[2vh]">
              {/* Title Header */}
              <div className="h-full w-[20vw] min-w-[180px] max-w-[260px] pt-[2vw] shrink-0 flex flex-col justify-start">
                <h2 className="text-[2.6vw] min-text-[24px] max-text-[42px] leading-[0.95] font-instrument italic">
                  {title}
                </h2>
              </div>

              {/* Top Milestones */}
              <div className="flex h-full gap-x-[12vw] max-[768px]:gap-x-[24vw]">
                {topData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[26vw] min-w-[260px] max-w-[360px] px-[2vw] shrink-0 flex flex-col justify-between"
                  >
                    {/* Milestone Copy */}
                    <div className="space-y-[0.8vw]">
                      <h4
                        className={`title-${item.id} text-[2vw] min-text-[20px] max-text-[28px] font-mono font-medium leading-tight`}
                      >
                        {item.year} {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} text-[1.1vw] min-text-[13px] max-text-[15px] leading-relaxed`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>

                    {/* Stem & Center Dot */}
                    <div className="w-full relative h-[45%] flex flex-col justify-end items-start pointer-events-none">
                      <div
                        className={`h-[92%] w-px origin-bottom rounded-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`size-[12px] -translate-x-[5.5px] translate-y-[6px] relative aspect-square rounded-full jd-${item.id}`}
                        style={activeStyle}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lower Row (Bottom Track) */}
            <div className="h-1/2 flex items-center justify-start w-full pt-[2vh]">
              {/* Period Label */}
              <div className="w-[20vw] min-w-[180px] max-w-[260px] h-full pt-[2vw] shrink-0 flex flex-col justify-end">
                <p
                  className="text-[1.3vw] min-text-[13px] leading-none font-mono uppercase tracking-widest"
                  style={mutedTextStyle}
                >
                  {periodLabel}
                </p>
              </div>

              {/* Bottom Milestones */}
              <div className="flex h-full gap-x-[16vw] max-[768px]:gap-x-[24vw] ml-[6vw]">
                {bottomData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[26vw] min-w-[260px] max-w-[360px] px-[2vw] shrink-0 flex flex-col justify-between"
                  >
                    {/* Stem & Center Dot */}
                    <div className="w-full relative h-[45%] flex flex-col justify-start items-start pointer-events-none">
                      <div
                        className={`size-[12px] -translate-x-[5.5px] -translate-y-[6px] relative aspect-square rounded-full jd-${item.id}`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`h-[92%] origin-top w-px rounded-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                    </div>

                    {/* Milestone Copy */}
                    <div className="space-y-[0.8vw]">
                      <h4
                        className={`title-${item.id} text-[2vw] min-text-[20px] max-text-[28px] font-mono font-medium leading-tight`}
                      >
                        {item.year} {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} text-[1.1vw] min-text-[13px] max-text-[15px] leading-relaxed`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
