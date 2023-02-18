import { useState } from "react";
import axios from "axios";
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const owners = await axios.get(`/api/owners?name=${searchTerm}`);
    const pets = await axios.get(`/api/pets?name=${searchTerm}`);

    const ownerResults = owners.data.filter((owner) =>
      owner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const petResults = pets.data.filter((pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const results = ownerResults.concat(petResults);
    setSearchResults(results);
  };

  return (
    <div>
        <Header/>
    <div className="p-4">
      <div className="text-center mb-4">
        <input
          type="text"
          className="border border-gray-400 py-2 px-3 rounded-md w-64"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-md"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="max-w-xs mx-auto">
        <div className="bg-gray-100 rounded-md inline-block p-4">
          <h2 className="font-bold mb-4">Resultado de la Busqueda:</h2>
          <ul className="list-none">
            {searchResults.map((result) => (
              <li key={result.id} className="mb-4">
                <p className="font-bold">Dueño: {result.name}</p>
                <p>Email: {result.email}</p>
                <p>Teléfono: {result.phone}</p>
                <p>Dirección: {result.address}</p>
                {result.pets && result.pets.length > 0 && (
                  <ul className="list-none">
                    {result.pets.map((pet) => (
                      <li key={pet.id}>
                        <p>Nombre mascota: {pet.name}</p>
                        <p>Edad mascota: {pet.age}</p>
                        <p>Diagnostico: {pet.diagnosis}</p>
                        <p>Observaciones: {pet.instructions}</p>
                        <p>Fecha ingreso: {new Date(pet.admission).toLocaleDateString('es-AR')}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
}
