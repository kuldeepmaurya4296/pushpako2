import Teams from "@/components/Pages/Teams/Index";
export const metadata = {
  title: "Our Team | Pushpak O2",
  description: "Meet the leadership and innovators driving hydrogen aviation."
}
export default function page() {
  return (
    <div className="min-h-screen text-white bg-[#060B18]  ">
      <Teams/>
    </div>
  )
}
