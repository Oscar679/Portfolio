import { useState } from 'react'
import './index.css'

const email = 'oscarekberg@hotmail.com'
const github = 'https://github.com/Oscar679'

function ExternalLink({ href, children, ...props }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
}

function Header() {
  return (
    <header className="site-header container">
      <a className="wordmark" href="#top" aria-label="Oscar Ekberg, home">Oscar Ekberg<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Say hello</a>
      </nav>
    </header>
  )
}

function Intro() {
  return (
    <section className="intro container" aria-labelledby="intro-title">
      <div className="intro__copy">
        <h1 id="intro-title">Hi, I’m Oscar.</h1>
        <p className="intro__role">Backend developer & DevOps engineer.</p>
        <p className="intro__description">I’m based in Växjö, Sweden, and open to relocating. These days I split my time between studying at Linnéuniversitetet and working at Columbus.</p>
        <a className="intro__link" href="#work">Take a look around <span aria-hidden="true">↓</span></a>
      </div>
      <figure className="portrait">
        <img src="/images/oscar.webp" alt="Oscar Ekberg" width="320" height="320" fetchPriority="high" />
      </figure>
    </section>
  )
}

function Experience() {
  return (
    <section className="experience container" id="work" aria-labelledby="experience-title">
      <div className="section-heading">
        <h2 id="experience-title">Where I work</h2>
        <ExternalLink className="text-link" href="https://www.linkedin.com/in/oscar-ekberg-127833250/">More on LinkedIn</ExternalLink>
      </div>
      <div className="experience__content">
        <div className="experience__role">
          <h3>Columbus</h3>
          <p className="experience__position">Associate Consultant · Part-time</p>
          <p className="experience__date"><time dateTime="2026-08">Aug 2026</time> – present</p>
          <p className="experience__team">Enterprise Information Management (EIM)</p>
        </div>
        <div className="experience__copy">
          <p>I’m working on a monitoring tool for M-Files and Windows systems. My part involves collecting and processing log data, detecting unusual activity, and building alerts and dashboards.</p>
          <p className="experience__progression">I joined for a summer internship in June–July 2026 and stayed on part-time alongside my studies.</p>
          <p className="experience__stack">C#/.NET · React · TypeScript · SQL · Azure</p>
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="work container" id="projects" aria-labelledby="work-title">
      <div className="section-heading">
        <h2 id="work-title">A few things I’ve built</h2>
        <ExternalLink className="text-link" href={github}>More on GitHub</ExternalLink>
      </div>

      <article className="featured-project">
        <ExternalLink className="project-image project-image--game" href={`${github}/TerraTactics`} aria-label="Explore TerraTactics on GitHub">
          <img src="/images/terratactics.webp" alt="TerraTactics gameplay: two pixel characters face off on floating grass platforms." width="1200" height="675" />
        </ExternalLink>
        <div className="featured-project__copy">
          <p className="project-type">Made with my course team</p>
          <h3>TerraTactics</h3>
          <p>A two-player game where you get ten seconds to take your turn while the lava keeps rising.</p>
          <p className="project-context">Part of my studies at Linnéuniversitetet.</p>
          <p className="project-stack">JavaScript · Rune.js · Electron</p>
          <ExternalLink className="project-link" href={`${github}/TerraTactics`}>See it on GitHub <span aria-hidden="true">↗</span></ExternalLink>
        </div>
      </article>

      <div className="project-grid">
        <article className="project">
          <ExternalLink className="project-image project-image--hardware" href={`${github}/iot_project`} aria-label="Explore ClimateBot on GitHub">
            <img src="/images/climatebot.webp" alt="My ClimateBot prototype, with a Raspberry Pi Pico, a blue temperature sensor, and jumper wires on a breadboard." width="1200" height="900" loading="lazy" />
          </ExternalLink>
          <div className="project__heading">
            <h3>ClimateBot</h3>
            <ExternalLink className="text-link" href={`${github}/iot_project`} aria-label="ClimateBot source code">Code</ExternalLink>
          </div>
          <p>My home office felt uncomfortable, so I built a sensor and dashboard to track the temperature and humidity.</p>
          <p className="project-stack">Python · Flask · MySQL · AWS</p>
        </article>

        <article className="project">
          <ExternalLink className="project-image project-image--geo" href="https://melab.lnu.se/~oe222ia/1me326/" aria-label="Visit the GeoGuessr Clone live site">
            <img src="/images/geoguessr.webp" alt="The start screen of my GeoGuessr clone." width="1200" height="750" loading="lazy" />
          </ExternalLink>
          <div className="project__heading">
            <h3>GeoGuessr Clone</h3>
            <div className="project__links">
              <ExternalLink className="text-link" href="https://melab.lnu.se/~oe222ia/1me326/" aria-label="GeoGuessr Clone live site">Live site</ExternalLink>
              <ExternalLink className="text-link" href={`${github}/Web-Technology-6---GeoGuessr-Clone`} aria-label="GeoGuessr Clone source code">Code</ExternalLink>
            </div>
          </div>
          <p>My take on GeoGuessr, where you and a friend guess the same five locations and compare how close you got.</p>
          <p className="project-stack">PHP · Slim 4 · MySQL · Web Components</p>
        </article>
      </div>

      <div className="small-project">
        <p>I’ve also experimented with <strong>LSTM networks</strong> for time-series prediction and classification.</p>
        <ExternalLink className="text-link" href={`${github}/Deep_Learning_Project`}>View project</ExternalLink>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about container" id="about" aria-labelledby="about-title">
      <div>
        <h2 id="about-title">A little about me</h2>
        <p className="about__intro">I like figuring out<br className="desktop-break" /> how things work.</p>
      </div>
      <div className="about__copy">
        <p>I’m studying Interactive Media and Web Technologies at Linnéuniversitetet. I’m particularly interested in backend development, cloud infrastructure, and applied AI.</p>
        <p>Before Columbus, I interned at Videntic, where I worked with AWS, GitHub Actions, Pulumi, and PostgreSQL.</p>
        <ExternalLink className="text-link" href="https://www.linkedin.com/in/oscar-ekberg-127833250/">Find me on LinkedIn</ExternalLink>
      </div>
    </section>
  )
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState('')

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopyStatus('Email copied')
    } catch {
      setCopyStatus('Couldn’t copy. You can select the address above.')
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <div>
          <h2 id="contact-title">Say hello.</h2>
          <p>If you’d like to work together or ask about a project, send me an email.</p>
        </div>
        <div className="contact__email">
          <a className="email-link" href={`mailto:${email}`}>{email}</a>
          <div className="copy-control">
            <button className="copy-button" type="button" onClick={copyEmail} aria-label="Copy email address">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></svg>
              Copy email
            </button>
            <span className="copy-status" role="status">{copyStatus}</span>
          </div>
        </div>
      </div>
      <footer className="container site-footer">
        <span>© {new Date().getFullYear()} Oscar Ekberg</span>
        <div>
          <ExternalLink href={github}>GitHub</ExternalLink>
          <ExternalLink href="https://www.linkedin.com/in/oscar-ekberg-127833250/">LinkedIn</ExternalLink>
          <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </section>
  )
}

export default function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Intro />
        <Experience />
        <Work />
        <About />
        <Contact />
      </main>
    </div>
  )
}
