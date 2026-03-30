import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return <h1>Главная страница</h1>
}

function About() {
  return <h1>О нас</h1>
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Главная</Link> | <Link to="/about">О нас</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
