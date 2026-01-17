import LayoutWrapper from "@/app/LayoutWrapper"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import Providers from "@/components/Providers"
import AnalyticsTracker from "@/components/AnalyticsTracker"

import { SEO_CONFIG, generateMetadata, generateSchema } from "@/lib/seo-config";

export const metadata = generateMetadata({
  title: "PushpakO2 | Indian Aerospace & Advanced Engineering Authority",
  description: "PushpakO2 is India's premier indigenous aerospace company in Bhopal. Redefining the future of aviation with AI-enabled intelligent aerial systems and specialized unmanned drones.",
  keywords: ["PushpakO2", "Aerospace Bhopal", "Indian Aviation", "Urban Air Mobility"],
  path: "/"
});

const jsonLdOrg = generateSchema('Organization');
const jsonLdLocal = generateSchema('LocalBusiness');


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen  text-white bg-[#060B18]" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocal) }}
        />
        <Providers>
          <AnalyticsTracker />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
