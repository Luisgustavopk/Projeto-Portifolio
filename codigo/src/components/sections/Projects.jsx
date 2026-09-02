import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProjectCard from './ProjectCard.jsx'
import { projects } from '../../data/projects.js'

export default function Projects() {
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current
      const scrollAmount = clientWidth * 0.85
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="projetos" className="max-w-4xl mx-auto px-6 py-24 space-y-6 scroll-mt-28">
      {/* Cabeçalho Minimalista */}
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Projetos em Destaque</h2>
      </div>

      {/* Container do Carrossel com Navegação Flutuante Afastada */}
      <div className="relative group">
        {/* Seta Esquerda */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-12 lg:-left-14 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full border border-white/10 bg-slate-950/80 backdrop-blur-md text-white/70 hover:text-white hover:bg-slate-900 hover:border-white/25 hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl cursor-pointer"
          aria-label="Projeto anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Seta Direita */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-12 lg:-right-14 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full border border-white/10 bg-slate-950/80 backdrop-blur-md text-white/70 hover:text-white hover:bg-slate-900 hover:border-white/25 hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl cursor-pointer"
          aria-label="Próximo projeto"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carrossel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-full md:w-[calc(50%-12px)] shrink-0 snap-start"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}