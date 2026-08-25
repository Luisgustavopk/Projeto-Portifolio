import ProjectCard from './ProjectCard.jsx'
import { projects } from '../../data/projects.js'

export default function Projects() {
  return (
    <section id="projetos" className="max-w-4xl mx-auto px-6 py-24 space-y-10">
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Projetos em Destaque</h2>
        </div>
        <span className="text-xs font-mono text-neutral-500">Timeline Recente</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
