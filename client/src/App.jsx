import { useEffect } from 'react'
import './styles/global.css'
import BinaryBackground from './components/BinaryBackground'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ChatBot from './components/ChatBot'

function App() {
  useEffect(() => {
    document.title = 'Samantha Makowski — IT Portfolio'
  }, [])

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
      <ChatBot />
    </div>
  )
}

export default App