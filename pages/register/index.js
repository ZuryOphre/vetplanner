import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import { useState } from "react";
import Modal from "../../components/modal";

const Register = () => {
  const [ownerData, setOwnerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [petData, setPetData] = useState({
    name: "",
    observations: "",
    admission: "",
    ownerId: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // Add success message state
  const [showModal, setShowModal] = useState(false);

  const handleSuccess = () => {
    setSuccessMessage("¡Registro exitoso!");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleOwnerChange = (event) => {
    const { name, value } = event.target;
    setOwnerData({ ...ownerData, [name]: value });
  };

  const handlePetChange = (event) => {
    const { name, value } = event.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // First, create the owner
    fetch("/api/owners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ownerData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Then, create the pet with the ownerId
        const petWithOwnerId = { ...petData, ownerId: data.id };
        fetch("/api/pets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(petWithOwnerId),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Pet saved:", data);
            // Clear the form after saving
            setOwnerData({ name: "", email: "", phone: "", address: "" });
            setPetData({
              name: "",
              age: "",
              observations: "",
              admission: "",
              ownerId: "",
            });
            setSuccessMessage("registro exitoso!"); // Set success message
            setShowModal(true); // Set showModal to true after success message is set
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };
  

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:max-w-xl">
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 px-6 pt-6">
              Registro de Dueño y Mascota
            </h2>
            <div className="px-6 py-4">
              <label className="block text-gray-700 font-bold mb-2">
                Nombre Dueño:
              </label>
              <input
                type="text"
                name="name"
                value={ownerData.name}
                onChange={handleOwnerChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="px-6 py-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={ownerData.email}
                onChange={handleOwnerChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="px-6 py-4">
              <label className="block text-gray-700 font-bold mb-2">
                Telefono Celular:
              </label>
              <input
                type="text"
                name="phone"
                value={ownerData.phone}
                onChange={handleOwnerChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="px-6 py-4">
              <label className="block text-gray-700 font-bold mb-2">
                Direccion:
              </label>
              <input
                type="text"
                name="address"
                value={ownerData.address}
                onChange={handleOwnerChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="px-6 py-4">
              <label className="block text-gray-700 font-bold mb-2">
                Nombre Mascota:
              </label>
              <input
                type="text"
                name="name"
                value={petData.name}
                onChange={handlePetChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="px-6 py-4">
              <label className="block text-gray-700 font-bold mb-2">
                Observaciones:
              </label>
              <input
                type="text"
                name="observations"
                value={petData.observations}
                onChange={handlePetChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="px-6 py-4">
              <label className="block text-gray-700 font-bold mb-2">
                Fecha Ingreso:
              </label>
              <input
                type="date"
                name="admission"
                value={petData.admission}
                onChange={handlePetChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="px-6 py-4 flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Guardar
              </button>
            </div>
          </form>
          {showModal && (
            <Modal message={successMessage} onClose={handleCloseModal} successMessage={successMessage} />

          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
