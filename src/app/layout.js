import Header from "@/components/Pages/Header"
import "./globals.css"
import Footer from "@/components/Pages/Footer"
export const metadata = {
  title: "Pushpako2 | Hydrogen Electric Urban Air Mobility",
  description: "Experience Refined Innovation",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen  text-white bg-[#060B18]">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
