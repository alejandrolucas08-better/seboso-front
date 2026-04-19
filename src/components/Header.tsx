import { MapPin } from "lucide-react"; // Importando o ícone de localização do lucide-react
import { Link } from "react-router-dom"; // Importando o Link do react-router-dom para criar links de navegação

// Header principal (junta tudo)
export default function Header() {
  return (
    <header>
        <Head />
        <NavBar />
    </header>
  );
}

// Parte de cima
function Head() {
  return (  
    <div className="bg-[#C37351] px-6 py-4 flex items-center justify-between">
        <Link to="/">
            <h1 className="text-5xl  tracking-wide text-[#FFF8F5]" style={{fontFamily: 'Imbue'}}>Seboso</h1>
        </Link>

        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-neutral-100 font-bold">
                <MapPin size={20} className="opacity-80" />
                <span>Rio, Brazil</span>  
            </div>
            <Link to="/login_sigin">
                <button className="bg-[#2f2a28] hover:bg-[#1f1b19] text-white px-4 py-2 rounded transition-colors">Register</button>
            </Link>
        </div>    
    </div>
  );
}

// Navegação
function NavBar() {
  return (
    <nav className="bg-[#A85F42] px-6 py-3">
      <ul className="flex gap-6 text-neutral-100 font-bold">
        <li className="hover:text-[#000000] cursor-pointer border-b-2 border-transparent hover:border-black transition-all">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-[#000000] cursor-pointer border-b-2 border-transparent hover:border-black transition-all">
          <Link to="/books">Livros</Link>
        </li>
        <li className="hover:text-[#000000] cursor-pointer border-b-2 border-transparent hover:border-black transition-all">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
