import { NavLink } from "react-router-dom";
import Image from 'next/image';
import ano_sono_icon from "../../../public/ano_sono_icon.svg";

export function NavBar() {
  return (
    <nav className="navbar-container bg-gray-800 text-white p-4">
      <div className="text-2xl font-bold flex items-center">
        <NavLink to="/"><Image src={ano_sono_icon} alt="ano_sono" layout="responsive" width={30} height={30} /></NavLink>
        <NavLink to="/" className="ml-8 mr-4 hover:text-gray-300">Home</NavLink>
        <NavLink to="/about" className="mr-4 hover:text-gray-300">About</NavLink>
        <NavLink to="/Preference" className="hover:text-gray-300">Preference</NavLink>
      </div>
    </nav>
  );
}
