import { connectDB } from "@/lib/db/connectDB";
import Service from "@/lib/models/Service";
import ServicesClient from "@/components/Pages/Services/Index";

export default async function page() {
  let services = [];

  try {
    await connectDB();
    services = await Service.find({ status: 'active' }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  return (
    <div className="min-h-screen text-white bg-[#060B18]">
      <ServicesClient services={services} />
    </div>
  );
}
