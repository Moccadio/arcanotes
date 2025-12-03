import { useState } from "react";
import Home from "./pages/Home";
import CardCatalog from "./pages/CardCatalog";
import AddCard from "./pages/AddCard";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import ReadingSimulation from "./pages/SimulasiTarot";  // ← IMPORT HALAMAN

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {/* NAVBAR SELALU ADA */}
      <Navbar navigate={setPage} />

      {/* HALAMAN YANG BERUBAH */}
      {page === "home" && <Home navigate={setPage} />}
      {page === "catalog" && <CardCatalog navigate={setPage} />}
      {page === "reading" && <ReadingSimulation navigate={setPage} />}
      {page === "addcard" && <AddCard navigate={setPage} />}
      {page === "about" && <About navigate={setPage} />}     </>
  );
}
