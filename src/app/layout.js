import LayoutWrapper from "@/app/LayoutWrapper"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import Providers from "@/components/Providers"

export const metadata = {
  title: "Pushpako2 | Hydrogen Electric Urban Air Mobility",
  description: "Experience Refined Innovation",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen  text-white bg-[#060B18]">
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
