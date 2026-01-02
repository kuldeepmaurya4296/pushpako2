import AboutUS from "@/components/Pages/AboutUs/Index";
export const metadata = {
  title: "About Us | Pushpak O2 – Hydrogen Electric Aircraft",
  description:
    "Learn about Pushpak O2, our mission to redefine urban and intercity air mobility using hydrogen-electric aircraft and AI-driven autonomous systems.",
}
export default function page() {
  return (
    <div className="min-h-screen text-white bg-[#060B18]  ">
      <AboutUS/>
    </div>
  )
}
