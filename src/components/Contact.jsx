import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const links = [
  {
    label: 'GitHub',
    value: 'Oscar679',
    href: 'https://github.com/Oscar679',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'oscar-ekberg',
    href: 'https://www.linkedin.com/in/oscar-ekberg-127833250/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'oscar@example.com',
    href: 'mailto:oscar@example.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useScrollReveal()
  const [copied, setCopied] = useState(false)

  const handleEmailClick = async (e, label, value) => {
    if (label !== 'Email') return
    e.preventDefault()
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" ref={ref} className="reveal-section py-32 px-6 max-w-5xl mx-auto">
      <p className="text-cyan-400 text-sm font-mono mb-3"><span className="text-faint">// </span>contact.tsx</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact</h2>
      <p className="text-muted max-w-lg mb-12 leading-relaxed">
        Open to new opportunities, collaborations, or just a good conversation about tech. Feel free to reach out.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {links.map(({ label, value, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => handleEmailClick(e, label, value)}
            className="group glass-card flex items-center gap-3 px-6 py-4 rounded-2xl hover:border-cyan-400/30 transition-all"
          >
            <span className="text-muted group-hover:text-cyan-400 transition-colors">{icon}</span>
            <div>
              <p className="text-faint text-xs font-mono">{label}</p>
              <p className="text-primary text-sm group-hover:text-cyan-400 transition-colors">
                {label === 'Email' && copied ? 'Copied!' : value}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-24 pt-8 border-t border-card text-faint text-sm flex justify-between">
        <span>Oscar Ekberg</span>
        <span>Växjö, Sweden</span>
      </div>
    </section>
  )
}
