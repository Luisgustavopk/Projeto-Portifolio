import { Fragment } from 'react'

const stack = ['SpringBoot', 'React', 'Node.js', 'Python', 'Java']

export default function TechStack() {
  return (
    <div className="w-full bg-[#0D0D10]/80 border-b border-white/[0.06] py-5 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-xs font-mono text-neutral-400">
        {stack.map((tech, index) => (
          <Fragment key={tech}>
            <span className="flex items-center gap-2 text-white font-medium">{tech}</span>
            {index < stack.length - 1 && <span className="text-neutral-700">✦</span>}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
