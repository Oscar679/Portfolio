import { FaReact, FaAws, FaDocker, FaPython, FaGitAlt, FaJava, FaLinux } from 'react-icons/fa'
import { SiPhp, SiMysql, SiPostgresql, SiSupabase, SiTailwindcss, SiJavascript, SiGithubactions, SiHtml5, SiPulumi, SiTensorflow } from 'react-icons/si'
import useScrollReveal from '../hooks/useScrollReveal'

const K = ({ children }) => (
  <span className="text-cyan-400 font-medium">{children}</span>
)

const iconMap = {
  'PHP (Slim 4)':       { icon: SiPhp, color: '#777BB4' },
  'Java':               { icon: FaJava, color: '#ED8B00' },
  'React':              { icon: FaReact, color: '#61DAFB' },
  'JavaScript':         { icon: SiJavascript, color: '#F7DF1E' },
  'Tailwind':           { icon: SiTailwindcss, color: '#06B6D4' },
  'HTML/CSS':           { icon: SiHtml5, color: '#E34F26' },
  'MySQL':              { icon: SiMysql, color: '#4479A1' },
  'PostgreSQL':         { icon: SiPostgresql, color: '#336791' },
  'Supabase':           { icon: SiSupabase, color: '#3ECF8E' },
  'Docker':             { icon: FaDocker, color: '#2496ED' },
  'AWS App Runner':     { icon: FaAws, color: '#FF9900' },
  'GitHub Actions':     { icon: SiGithubactions, color: '#2088FF' },
  'Pulumi':             { icon: SiPulumi, color: '#8A3391' },
  'Deep Learning (LSTM)': { icon: SiTensorflow, color: '#FF6F00' },
  'Python':             { icon: FaPython, color: '#3776AB' },
  'Git':                { icon: FaGitAlt, color: '#F05032' },
  'Linux':              { icon: FaLinux, color: '#FCC624' },
}

const skills = [
  { category: 'Backend', items: ['PHP (Slim 4)', 'Java', 'REST APIs'] },
  { category: 'Frontend', items: ['React', 'JavaScript', 'Tailwind', 'HTML/CSS'] },
  { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'Supabase', 'Oracle'] },
  { category: 'Cloud & DevOps', items: ['AWS App Runner', 'GitHub Actions', 'Pulumi', 'Docker'] },
  { category: 'Other', items: ['Deep Learning (LSTM)', 'Python', 'Git', 'Linux'] },
]

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" ref={ref} className="reveal-section py-32 px-6 max-w-5xl mx-auto">
      <p className="text-cyan-400 text-sm font-mono mb-3"><span className="text-faint">// </span>about.tsx</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Who I am</h2>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="glass-card stagger-card p-8 rounded-2xl" data-delay="1">
          <p className="text-muted leading-relaxed mb-4">
            Curious and driven developer based in <span className="text-primary">Växjö, Sweden</span>, with a strong interest in backend systems, cloud environments, and data-driven applications.
          </p>
          <p className="text-muted leading-relaxed">
            I enjoy understanding how systems fit together — from database design to cloud infrastructure — and I'm motivated by building solutions that are both technically robust and practically useful.
          </p>
        </div>

        <div className="glass-card stagger-card p-8 rounded-2xl" data-delay="2">
          <h3 className="text-primary font-semibold mb-4">Experience</h3>
          <div className="border-l-2 border-cyan-500/40 pl-4">
            <p className="text-cyan-400 text-sm font-mono mb-1">Backend / DevOps Intern</p>
            <p className="text-primary font-medium mb-2">Videntic</p>
            <p className="text-muted text-sm leading-relaxed">
              Worked on a cloud-based web platform handling backend development and DevOps. Refactored <K>Supabase</K>/<K>PostgreSQL</K> database structure for better data modeling and maintainability. Deployed and managed backend services on <K>AWS App Runner</K> and <K>Lambda</K>.
            </p>
            <p className="text-muted text-sm leading-relaxed mt-2">
              Set up and maintained <K>CI/CD pipelines</K> with <K>GitHub Actions</K> — automated <K>Docker</K> builds, deployments, and environment management. Managed cloud infrastructure with <K>Pulumi</K> (<K>TypeScript</K>) IaC, branching strategies, staging environments, and secrets management.
            </p>
          </div>
        </div>
      </div>

      {/* Education card */}
      <div className="glass-card stagger-card p-8 rounded-2xl mb-16" data-delay="3">
        <h3 className="text-primary font-semibold mb-6">Education</h3>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="border-l-2 border-cyan-500/40 pl-4">
            <p className="text-cyan-400 text-sm font-mono mb-1">2023 — present</p>
            <p className="text-primary font-medium mb-1">Linnéuniversitetet</p>
            <p className="text-muted text-sm mb-3">Interaktiva medier och webbteknologier</p>
            <p className="text-muted text-sm leading-relaxed">
              A broad programme covering web development, system design, databases, cloud computing, and interactive media. Completed <K>134+ hp</K> with coursework spanning backend, frontend, DevOps, and machine learning.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/oscar-ekberg-127833250/details/courses/"
            target="_blank"
            rel="noreferrer"
            className="btn-outline text-sm px-4 py-2 rounded-full whitespace-nowrap self-start transition-all hover:border-cyan-400/60 hover:text-cyan-400"
          >
            Full course list →
          </a>
        </div>
      </div>

      {/* Skills with icons */}
      <div className="space-y-5">
        {skills.map(({ category, items }) => (
          <div key={category} className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-muted text-sm font-mono w-36 shrink-0 opacity-50">{category}</span>
            <div className="flex flex-wrap gap-2">
              {items.map(skill => {
                const entry = iconMap[skill]
                return (
                  <span
                    key={skill}
                    className="tag skill-tag flex items-center gap-1.5 px-3 py-1 rounded-full text-sm transition-all duration-200"
                    style={{ '--tag-color': entry?.color ?? 'rgb(103,232,249)' }}
                    onMouseEnter={e => {
                      const c = entry?.color ?? 'rgb(103,232,249)'
                      e.currentTarget.style.borderColor = c + '66'
                      e.currentTarget.style.color = c
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = ''
                      e.currentTarget.style.color = ''
                    }}
                  >
                    {entry && <entry.icon size={12} style={{ color: entry.color }} className="opacity-80 shrink-0" />}
                    {skill}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
