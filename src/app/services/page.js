import { connectDB } from "@/lib/db/connectDB";
import Service from "@/lib/models/Service";
import ServicesClient from "@/components/Pages/Services/Index";
import { generateMetadata, generateSchema } from "@/lib/seo-config";

export const metadata = generateMetadata({
  title: "Aviation & Aerospace Services | PushpakO2",
  description: "Explore PushpakO2's specialized services in Aviation Platform Design, Intelligent Aerial Systems, Unmanned Systems (UAS), and Environmental Monitoring Solutions.",
  keywords: ["Aviation Platform Design", "Intelligent Aerial Systems", "Unmanned & Autonomous Systems", "Environmental Monitoring Drones", "Advanced Mobility"],
  path: "/services"
});

export default async function page() {
  let services = [];
  let serviceSchema = {};

  try {
    await connectDB();
    services = await Service.find({ status: 'active' }).sort({ createdAt: -1 }).lean();
    services = JSON.parse(JSON.stringify(services));

    // Generate ItemList Schema for Services
    const serviceItems = services.map((service, index) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.title,
      "description": service.description,
      "url": `https://pushpako2.com/services#${service._id}` // Assuming anchor links or similar
    }));

    serviceSchema = generateSchema('ItemList', {
      "itemListElement": serviceItems
    });

  } catch (error) {
    console.error("Error fetching services:", error);
  }

  return (
    <div className="min-h-screen text-white bg-[#060B18]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesClient services={services} />
    </div>
  );
}
