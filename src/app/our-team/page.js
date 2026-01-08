import { connectDB } from "@/lib/db/connectDB";
import Team from "@/lib/models/Team";
import TeamsClient from "@/components/Pages/Teams/Index";
import { leadershipTeam } from "@/lib/data/companyData";

export const metadata = {
  title: "Our Team | PushpakO2 - Leadership & Innovation",
  description: "Meet the leadership team driving India's aviation innovation at PushpakO2. A balanced founding team combining technology leadership with strategic vision."
}

export default async function page() {
  let members = [];

  try {
    await connectDB();
    const dbMembers = await Team.find({ isActive: true }).sort({ order: 1 }).lean();

    if (dbMembers && dbMembers.length > 0) {
      members = JSON.parse(JSON.stringify(dbMembers));
      console.log('Team members from database:', members.length);
    } else {
      // Use hardcoded leadership data as fallback
      console.log('No team members in database, using hardcoded data');
      members = leadershipTeam;
    }
  } catch (error) {
    console.error("Error fetching team:", error);
    // Use hardcoded data on error
    members = leadershipTeam;
  }

  return (
    <div className="min-h-screen text-white bg-[#060B18]">
      <TeamsClient members={members} />
    </div>
  );
}
