import Link from 'next/link';

const Header = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="logo-container flex items-center flex-shrink-0 text-white mr-6">
        <img src="/VetPlanner.png" alt="Logo" className="w-12 h-12 mr-2" />
        <span className="font-semibold text-xl tracking-tight">VetPlanner</span>
      </div>
      <div className="links-container flex-grow">
        <ul className="flex justify-end">
          <li className="mr-4">
            <Link legacyBehavior href="/register">
              <a className="text-white hover:text-gray-200">Registrar Paciente</a>
            </Link>
          </li>
          <li className="mr-4">
            <Link legacyBehavior href="/buscar">
              <a className="text-white hover:text-gray-200">Buscar Paciente</a>
            </Link>
          </li>
          <li className="mr-4">
            <Link legacyBehavior href="/actualizar">
              <a className="text-white hover:text-gray-200">Actualizar Datos</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/eliminar">
              <a className="text-white hover:text-gray-200">Eliminar Datos</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
