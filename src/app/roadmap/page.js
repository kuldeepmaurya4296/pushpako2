

import { connectDB } from "@/lib/db/connectDB";
import Roadmap from "@/lib/models/Roadmap";

export default async function RoadmapPage() {
  let roadmapData = [];

  try {
    await connectDB();
    roadmapData = await Roadmap.find({}).sort({ order: 1 });
  } catch (error) {
    console.error("Error fetching roadmap:", error);
  }

  return (
    <section className="py-24 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-14">Company Roadmap</h1>

        {roadmapData.length > 0 ? (
          <div className="grid md:grid-cols-4 gap-8">
            {roadmapData.map((item) => (
              <div key={item._id || item.id} className="p-8 border border-white/10 rounded-xl hover:border-white/30 transition-all">
                <h3 className="text-3xl font-bold mb-2">{item.quarter}</h3>
                <p className="text-gray-300">{item.title}</p>
                {item.description && (
                  <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No roadmap items found</h3>
            <p className="text-gray-500">Roadmap items will be displayed here once added.</p>
          </div>
        )}
      </div>
    </section>
  );
}
