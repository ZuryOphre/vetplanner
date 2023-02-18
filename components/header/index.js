import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 flex items-center justify-between bg-teal-500 p-3">
      <div className="logo-container flex items-center text-white mr-6">
      <Link href="/" legacyBehavior>
        <a className="logo-container flex items-center text-white mr-6">
          <img src="/VetPlanner.png" alt="Logo" className="w-12 h-12 mr-2"/>
          <span className="font-semibold text-xl tracking-tight cursor-pointer">VetPlanner</span>
        </a>
      </Link>
      </div>
      <div className="links-container hidden md:flex">
        <ul className="flex justify-end">
          <li className="mr-4">
            <Link href="/register" legacyBehavior>
              <a className="text-white hover:text-gray-200">Registrar Paciente</a>
            </Link>
          </li>
          <li className="mr-4">
            <Link href="/search" legacyBehavior>
              <a className="text-white hover:text-gray-200">Buscar Paciente</a>
            </Link>
          </li>
          <li className="mr-4">
            <Link href="/actualizar" legacyBehavior>
              <a className="text-white hover:text-gray-200">Actualizar Datos</a>
            </Link>
          </li>
          <li>
            <Link href="/eliminar" legacyBehavior>
              <a className="text-white hover:text-gray-200">Eliminar Datos</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="flex items-center text-white focus:outline-none">
          {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 right-0 bg-teal-500 text-white p-4 z-50">
            <ul className="flex flex-col">
              <li className="my-2">
                <Link href="/register" legacyBehavior>
                  <a className="text-white hover:text-gray-200" onClick={toggleMenu}>Registrar Paciente</a>
                </Link>
              </li>
              <li className="my-2" >
                <Link href="/search" legacyBehavior>
                  <a className="text-white hover:text-gray-200" onClick={toggleMenu}>Buscar Paciente</a>
                </Link>
              </li>
              <li className="my-2">
                <Link href="/actualizar" legacyBehavior>
                  <a className="text-white hover:text-gray-200" onClick={toggleMenu}>Actualizar Datos</a>
                </Link>
              </li>
              <li className="my-2">
                <Link href="/eliminar" legacyBehavior>
                  <a className="text-white hover:text-gray-200" onClick={toggleMenu}>Eliminar Datos</a>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
