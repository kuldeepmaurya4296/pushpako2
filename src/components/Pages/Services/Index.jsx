import Footer from "../Footer";
import Header from "../Header";
import ServicesPage from "./ServicePage";

export default function Services() {
  return (
    <div className="min-h-screen text-white bg-[#060B18]">
      <Header />

      <main>
        <ServicesPage />
      </main>

      <Footer />
    </div>
  )
}
