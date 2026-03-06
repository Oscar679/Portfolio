import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ScrollToTop from './components/ScrollToTop'
import PageLoader from './components/PageLoader'
import ScrollProgress from './components/ScrollProgress'
import SectionDivider from './components/SectionDivider'
import DotNav from './components/DotNav'
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <>
      <CustomCursor />
      <DotNav />
      <PageLoader />
      <ScrollProgress />
      <div className="site-root min-h-screen">
        <Navbar />
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
        <ScrollToTop />
      </div>
    </>
  )
}
