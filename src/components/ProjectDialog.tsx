import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Github, Globe, X } from "lucide-react"
import { useTransition, animated } from "react-spring"
import type Lenis from 'lenis'

import { Project } from "../data/types"
import { Skeleton } from "./ui/skeleton"

interface ProjectDialogProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
  lenis?: Lenis | null
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  project,
  open,
  onOpenChange,
  lenis,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState<Record<number, boolean>>({})
  const [imageError, setImageError] = React.useState<Record<number, boolean>>({})
  const [activeImageIndex, setActiveImageIndex] = React.useState(0)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (open) {
      lenis?.stop()
      document.body.style.overflow = "hidden"
    } else {
      lenis?.start()
      document.body.style.overflow = "auto"
    }

    return () => {
      lenis?.start()
      document.body.style.overflow = "auto"
    }
  }, [open, lenis])

  React.useEffect(() => {
    setActiveImageIndex(0)
  }, [project.id, open])

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
      const isAtTop = scrollTop === 0
      const isAtBottom = scrollTop + clientHeight === scrollHeight

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        return
      }
      e.stopPropagation()
    }
  }

  const transitions = useTransition(open, {
    from: { opacity: 0, scale: 0.95, y: 10 },
    enter: { opacity: 1, scale: 1, y: 0 },
    leave: { opacity: 0, scale: 0.95, y: 10 },
    config: { tension: 200, friction: 26, mass: 1 },
  })

  const overlayTransitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 180, friction: 26, mass: 1 },
  })

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => ({
      ...prev,
      [index]: true
    }))
  }

  const handleImageError = (index: number) => {
    setImageError(prev => ({
      ...prev,
      [index]: true
    }))
  }

  const keyFeatures = project.workflow ?? []
  const galleryImages = project.image?.length ? project.image : []
  const currentImage = galleryImages[activeImageIndex]
  const hasLiveLink = Boolean(project.link && project.link !== "#")
  const hasGithubLink = Boolean(project.github && project.github !== "#")
  const fallbackUrl = "https://github.com/xavierzaidane"
  const liveProjectHref = hasLiveLink
    ? project.link!
    : hasGithubLink
      ? project.github!
      : fallbackUrl
  const sourceCodeHref = hasGithubLink
    ? project.github!
    : hasLiveLink
      ? project.link!
      : fallbackUrl

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal forceMount>
        {overlayTransitions((overlayStyles, item) =>
          item ? (
            <Dialog.Overlay forceMount asChild>
              <animated.div
                style={{
                  opacity: overlayStyles.opacity,
                  position: "fixed",
                  inset: 0,
                  zIndex: 50,
                }}
                className="bg-background/80 dark:bg-background/90 backdrop-blur-sm"
              />
            </Dialog.Overlay>
          ) : null,
        )}

        {transitions((contentStyles, item) =>
          item ? (
            <Dialog.Content forceMount asChild>
              <animated.div
                data-lenis-prevent="true"
                style={{
                  opacity: contentStyles.opacity,
                  transform: contentStyles.scale.to(
                    (s) => `translate3d(-50%, -50%, 0) scale(${s})`
                  ),
                  position: "fixed",
                  left: "50%",
                  top: "50%",
                  zIndex: 50,
                }}
                className="
                  relative z-50 flex max-h-[95vh] min-h-[30vh] w-full flex-1 flex-col overflow-hidden
                  border border-border bg-background text-foreground
                  backdrop-blur-xl shadow-2xl
                  max-w-[95%] sm:w-[90%] sm:max-w-[90%] md:min-h-[40vh] md:w-[80%] md:max-w-[80%] lg:max-w-[80%] xl:max-w-[70%]
                  focus:outline-none
                "
              >
                <Dialog.Close className="group absolute right-3 top-3 z-20 flex items-center justify-center rounded-full bg-transparent p-1 transition-colors hover:bg-muted sm:right-4 sm:top-4 sm:p-2">
                  <X className="size-5 text-foreground transition-all duration-200" />
                </Dialog.Close>

                <div className="flex flex-1 flex-col p-0 sm:p-6 md:p-8 lg:p-10 bg-background">
                  <div
                    ref={scrollContainerRef}
                    onWheel={handleWheel}
                    data-lenis-prevent="true"
                    className="grid max-h-[75vh] min-h-[50vh] grid-cols-1 gap-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid-cols-2"
                  >
                    <div
                      data-lenis-prevent="true"
                      className="flex flex-col overflow-y-auto border-b border-border/40 bg-muted/5 p-6 [scrollbar-width:none] [-ms-overflow-style:none] md:border-b-0 md:border-r md:p-10 [&::-webkit-scrollbar]:hidden"
                    >
                      <div className="mb-8">
                        <Dialog.Title className="mb-3 font-medium text-5xl leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-5xl text-foreground ">
                          {project.title}
                        </Dialog.Title>
                        <span className="inline-block border border-border/40 bg-background/50 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                          {project.category}
                        </span>
                      </div>

                      <div className="relative mb-auto aspect-[16/9] w-full md:w-[520px] lg:w-[600px] xl:w-[700px] max-w-full border border-border/40 bg-background/70 mx-auto">
                        {!imageLoaded[activeImageIndex] && !imageError[activeImageIndex] && (
                          <Skeleton className="absolute inset-0 h-full w-full animate-pulse" />
                        )}
                        {imageError[activeImageIndex] ? (
                          <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                            Image not available
                          </div>
                        ) : (
                          <img
                            src={currentImage}
                            alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                              imageLoaded[activeImageIndex] ? "opacity-100" : "opacity-0"
                            }`}
                            onLoad={() => handleImageLoad(activeImageIndex)}
                            onError={() => handleImageError(activeImageIndex)}
                          />
                        )}
                      </div>


                    </div>

                    <div
                      data-lenis-prevent="true"
                      className="flex flex-col overflow-y-auto p-6 [scrollbar-width:none] [-ms-overflow-style:none] md:p-10 [&::-webkit-scrollbar]:hidden bg-background"
                    >
                      <div className="space-y-10">
                        <section>
                          <h3 className="mb-4 flex items-center gap-2 border-b border-border/40 pb-2 font-mono text-xs uppercase tracking-widest text-foreground">
                            <span className="h-1.5 w-1.5 rounded-none bg-foreground" />
                            Overview
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                            {project.fullDescription || project.description}
                          </p>
                        </section>

                        {keyFeatures.length > 0 && (
                          <section>
                            <h3 className="mb-4 flex items-center gap-2 border-b border-border/40 pb-2 font-mono text-xs uppercase tracking-widest text-foreground">
                              <span className="h-1.5 w-1.5 rounded-none bg-foreground" />
                              Key Features
                            </h3>
                            <ul className="space-y-3">
                              {keyFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                                  <span className="mt-0.5 font-mono text-xs text-foreground/40">
                                    {String(idx + 1).padStart(2, "0")}
                                  </span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </section>
                        )}

                        <section>
                          <h3 className="mb-4 flex items-center gap-2 border-b border-border/40 pb-2 font-mono text-xs uppercase tracking-widest text-foreground">
                            <span className="h-1.5 w-1.5 rounded-none bg-foreground" />
                            Technologies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, idx) => (
                              <span
                                key={idx}
                                className="border border-border/40 bg-background px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </section>

                        <div className="mt-auto flex flex-wrap gap-4 pt-6">
                          <a
                            href={liveProjectHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex min-w-[200px] items-center justify-between gap-4 border border-foreground bg-foreground px-6 py-4 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground/90"
                          >
                            Visit Live Project
                            <Globe className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>

                          <a
                            href={sourceCodeHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex min-w-[200px] items-center justify-between gap-4 border border-border/60 bg-transparent px-6 py-4 font-mono text-xs uppercase tracking-widest text-foreground transition-all hover:border-foreground"
                          >
                            View Source Code
                            <Github className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </animated.div>
            </Dialog.Content>
          ) : null,
        )}
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ProjectDialog
