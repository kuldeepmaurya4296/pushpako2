import ContactUs from "@/components/Pages/Contactus/Index";
export const metadata = {
  title: "Contact Us | Pushpak O2",
  description: "Reach out to Pushpak O2 for partnerships, support, and aerospace innovation inquiries."
}

export default function page() {
  return (
    <div className="min-h-screen text-white bg-[#060B18]  ">
      <ContactUs/>
    </div>
  )
}
