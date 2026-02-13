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
  const [imageLoaded, setImageLoaded] = React.useState<Record<string, boolean>>({})
  const [imageError, setImageError] = React.useState<Record<string, boolean>>({})
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
                className="bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>
          ) : null,
        )}

        {transitions((contentStyles, item) =>
          item ? (
            <Dialog.Content forceMount asChild>
              <animated.div
                style={{
                  opacity: contentStyles.opacity,
                  transform: contentStyles.scale.to(
                    (s) => `scale(${s})`
                  ),
                  position: "fixed",
                  left: "50%",
                  top: "50%",
                  x: "-50%",
                  y: "-50%",
                  zIndex: 50,
                }}
                className="
                  w-[95vw] sm:w-[90vw] md:w-[85vw] max-w-2xl
                  rounded-xl sm:rounded-2xl bg-[#050505] text-white
                  border border-white/10
                  shadow-2xl
                  focus:outline-none
                  max-h-[90vh] sm:max-h-[95vh] overflow-hidden flex flex-col
                "
              >

                <div className="px-4 sm:px-6 py-3 sm:py-4 shrink-0 relative">
                  <Dialog.Title className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white text-center mt-6 sm:mt-8 md:mt-10">
                    {project.title}
                  </Dialog.Title>

                  <Dialog.Close className="absolute right-3 sm:right-4 top-3 sm:top-4 rounded-md p-1 text-white/60 ">
                    <X className="h-4 w-4 sm:h-5 sm:w-5 text-white " />
                  </Dialog.Close>    
                  <div>
                    <p className="px-4 sm:px-8 md:px-10 py-2 space-y-4 sm:space-y-6 flex-1 mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-center leading-relaxed text-white/70">
                      {project.fullDescription || project.description}
                    </p>
                  </div>
                </div>

                {/* Scrollable content */}
                <div 
                  ref={scrollContainerRef}
                  onWheel={handleWheel}
                  className="overflow-y-auto hide-scrollbar px-4 sm:px-6 md:px-10 py-2 space-y-4 sm:space-y-6 flex-1 max-h-[calc(90vh-200px)] sm:max-h-[calc(95vh-250px)]"
                >        
                  
                  <div>
                    <div className="flex flex-col gap-3 sm:gap-4">
                      {(project.image || [project.image]).map((img, idx) => (
                        <div key={idx} className="overflow-hidden rounded-lg border border-white/10 w-full relative">
                          {!imageLoaded[idx] && !imageError[idx] && (
                            <Skeleton className="w-full h-40 sm:h-52 md:h-64 animate-pulse" />
                          )}
                          {imageError[idx] ? (
                            <div className="w-full h-40 sm:h-52 md:h-64 flex items-center justify-center bg-white/10 text-white/70 text-sm">
                              Image not available
                            </div>
                          ) : (
                            <img
                              src={img}
                              alt={`${project.title} - ${idx + 1}`}
                              className={`w-full h-auto object-cover transition-opacity duration-300 ${
                                imageLoaded[idx] ? 'opacity-100' : 'opacity-0'
                              }`}
                              onLoad={() => handleImageLoad(idx)}
                              onError={() => handleImageError(idx)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 sm:mb-3">
                      Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-white/10 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono text-white/70 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 sm:mb-3">
                      Workflow
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.workflow?.map((workflow, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-white/10 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono text-white/70 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                        >
                          {workflow}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-2 sm:mb-4">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 sm:mb-3">
                      Source
                    </h3>
                    <div className="flex gap-2 sm:gap-3">
                      <a 
                        href={project.github || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200"
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <a 
                        href={project.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200"
                      >
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
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
