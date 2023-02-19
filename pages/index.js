import Header from "../components/header/index"
import Footer from "../components/footer/index"

export default function Home() {
  return (
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center pt-12">
      <h1 className="text-5xl font-bold mb-10">Agenda Veterinaria</h1>
      <div className="flex items-center">
        <img src="/VetPlanner.png" alt="Logo" className="w-32 h-32 mr-2"/>
      </div>
    </div>
    <Footer/>
    </>
  );
}
