import Home from "@/components/Pages/Homepage/Index";
import { connectDB } from "@/lib/db/connectDB";
import Team from "@/lib/models/Team";
import { leadershipTeam } from "@/lib/data/companyData";

export const metadata = {
  title: "PushpakO2 | Innovating India's Aviation Safety",
  description: "PushpakO2 is revolutionizing aviation safety with advanced indigenous technology.",
}

export default async function page() {
  let teamData = [];
  try {
    await connectDB();
    const dbMembers = await Team.find({}).sort({ order: 1 }).lean();
    if (dbMembers && dbMembers.length > 0) {
      teamData = JSON.parse(JSON.stringify(dbMembers));
    } else {
      teamData = leadershipTeam;
    }
  } catch (error) {
    console.error("Error fetching team data for home:", error);
    teamData = leadershipTeam;
  }

  return (
    <div className="min-h-screen text-white bg-[#060B18]">
      <Home teamData={teamData} />
    </div>
  )
}
