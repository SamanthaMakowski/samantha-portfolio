import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import BinaryBackground from '../components/BinaryBackground'
import Nav from '../components/Nav'
import Terminal from '../components/Terminal'

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <BinaryBackground />
      <Nav />
      <main>
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Terminal />
    </div>
  )
}