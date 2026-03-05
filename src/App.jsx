import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ScrollToTop from './components/ScrollToTop'
import PageLoader from './components/PageLoader'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <div className="site-root min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <ScrollToTop />
      </div>
    </>
  )
}
