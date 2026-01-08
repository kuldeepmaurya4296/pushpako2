import AboutUS from "@/components/Pages/AboutUs/Index";

export const metadata = {
  title: "About Us | PushpakO2 – Indian Aerospace & Aviation",
  description:
    "Learn about PushpakO2, an Indian aerospace and advanced engineering company focused on indigenous aviation platforms and intelligent aerial systems. Redefining the future of Indian aviation.",
  keywords: [
    "PushpakO2",
    "Indian aerospace",
    "indigenous aviation",
    "Make in India",
    "aviation platforms",
    "unmanned aerial systems",
    "UAS",
    "drone technology",
    "DGCA compliance"
  ],
}

export default function page() {
  return (
    <div className="min-h-screen text-white bg-[#060B18]">
      <AboutUS />
    </div>
  )
}
