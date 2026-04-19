import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importando o BrowserRouter, Routes e Route do react-router-dom para configurar as rotas
import Home from "./pages/Home"; // Importando a página Home
import Books from "./pages/Books"; // Importando a página Books
import About from "./pages/About"; // Importando a página About
import Login_sigin from "./pages/Login_signin"; // Importando a página Login/Sigin
import Header from "./components/Header"; // Importando o componente de header  

export default function App() { 
  return (
    <BrowserRouter>
      <Header /> {/* Renderizando o header em todas as páginas */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Rota para a página Home */}
        <Route path="/books" element={<Books />} /> {/* Rota para a página Books */}
        <Route path="/about" element={<About />} /> {/* Rota para a página About */}
        <Route path="/login_sigin" element={<Login_sigin />} /> {/* Rota para a página Login/Sigin */}
      </Routes>
    </BrowserRouter>
  );
}
