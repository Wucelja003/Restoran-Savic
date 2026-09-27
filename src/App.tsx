import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Menu from "./Pages/Menu"
import Gallery from "./Pages/Gallery"
import Reservation from "./Pages/Reservation"
import NotFound from "./Pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/o-nama" element={<About />} />
        <Route path="/meni" element={<Menu />} />
        <Route path="/galerija" element={<Gallery />} />
        <Route path="/rezervacija" element={<Reservation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
