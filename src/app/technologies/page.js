import { connectDB } from "@/lib/db/connectDB";
import Technology from "@/lib/models/Technology";
import TechnologiesClient from "@/components/Pages/Technology/Index";

export default async function page() {
  let technologies = [];

  try {
    await connectDB();
    technologies = await Technology.find({ status: 'active' }).sort({ createdAt: -1 }).lean();
    technologies = JSON.parse(JSON.stringify(technologies));
  } catch (error) {
    console.error("Error fetching technologies:", error);
  }

  return (
    <div className="min-h-screen text-white bg-[#060B18]">
      <TechnologiesClient technologies={technologies} />
    </div>
  );
}
