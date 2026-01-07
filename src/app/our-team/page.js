import { connectDB } from "@/lib/db/connectDB";
import Team from "@/lib/models/Team";
import TeamsClient from "@/components/Pages/Teams/Index";

export const metadata = {
  title: "Our Team | Pushpak O2",
  description: "Meet the leadership and innovators driving hydrogen aviation."
}

export default async function page() {
  let members = [];

  try {
    await connectDB();
    members = await Team.find({ isActive: true }).sort({ order: 1 }).lean();
    members = JSON.parse(JSON.stringify(members));
    console.log(' members:', members);
  } catch (error) {
    console.error("Error fetching team:", error);
  }
  return (
    <div className="min-h-screen text-white bg-[#060B18]">
      <TeamsClient members={members} />
    </div>
  );
}
