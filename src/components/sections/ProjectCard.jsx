import { IconImagePlaceholder } from '../ui/icons.jsx'

export default function ProjectCard({ project }) {
  return (
    <div className="bg-darkCard border border-white/10 rounded-xl p-5 flex flex-col justify-between space-y-5 hover:border-blue-500/30 transition-all group">
      <div className="space-y-4">
        <div className="w-full aspect-video rounded-lg bg-neutral-900 border border-white/5 flex flex-col items-center justify-center gap-2 text-neutral-600">
          <IconImagePlaceholder />
          <span className="text-[11px] font-mono">[ Preview do Projeto ]</span>
        </div>
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
          <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{project.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1"
        >
          Repository ↗
        </a>
      </div>
    </div>
  )
}
