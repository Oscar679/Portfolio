import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const projects = [
  {
    title: 'GeoGuessr Clone',
    description:
      'Full-stack web application with a Slim 4 REST API backend and vanilla JS frontend using web components. Features a MySQL database with full CRUD operations for game state, scores, and user authentication.',
    tags: ['Slim 4', 'Vanilla JS', 'Web Components', 'Tailwind', 'MySQL'],
    href: 'https://github.com/Oscar679/Web-Technology-6---GeoGuessr-Clone',
    accent: 'from-cyan-500/20 to-blue-500/10',
    dot: 'bg-cyan-400',
    glow: 'rgba(6,182,212,0.25)',
  },
  {
    title: 'ClimateBot',
    description:
      'IoT system that fetches real-time climate data from sensors into Google Sheets via a custom Python API. Processes and visualizes historical trends and live readings from my apartment.',
    tags: ['Python', 'IoT', 'REST API', 'Google Sheets', 'Data Viz'],
    href: 'https://github.com/Oscar679/iot_project',
    accent: 'from-teal-500/20 to-cyan-500/10',
    dot: 'bg-teal-400',
    glow: 'rgba(20,184,166,0.25)',
  },
  {
    title: 'Deep Learning Project',
    description:
      'Trained deep learning models for prediction and classification tasks. Focused on model architecture, training pipelines, and evaluating performance on real datasets.',
    tags: ['Python', 'Deep Learning', 'LSTM', 'Neural Networks'],
    href: 'https://github.com/Oscar679/Deep_Learning_Project',
    accent: 'from-violet-500/20 to-purple-500/10',
    dot: 'bg-violet-400',
    glow: 'rgba(139,92,246,0.25)',
  },
]

export default function Projects() {
  const ref = useScrollReveal()
  const [hovered, setHovered] = useState(null)

  return (
    <section id="projects" ref={ref} className="reveal-section py-32 px-6 max-w-5xl mx-auto">
      <p className="text-cyan-400 text-sm font-mono mb-3"><span className="text-faint">// </span>projects.tsx</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Projects</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHovered(p.title)}
            onMouseLeave={() => setHovered(null)}
            className="group glass-card rounded-2xl p-8 flex flex-col gap-4 transition-all hover:-translate-y-1"
            style={{
              boxShadow: hovered === p.title ? `0 0 28px ${p.glow}` : undefined,
              transition: 'transform 0.2s ease, box-shadow 0.3s ease',
            }}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.accent} border-card flex items-center justify-center`}>
              <span className={`w-2.5 h-2.5 rounded-full ${p.dot}`} />
            </div>

            <div>
              <h3 className="text-primary font-semibold text-xl mb-2 group-hover:text-cyan-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{p.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {p.tags.map(tag => (
                <span key={tag} className="tag px-2.5 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>

            <span className="text-cyan-400 text-sm group-hover:translate-x-1 transition-transform inline-block">
              View on GitHub →
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
