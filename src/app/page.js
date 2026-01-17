import Home from "@/components/Pages/Homepage/Index";
import { connectDB } from "@/lib/db/connectDB";
import Team from "@/lib/models/Team";
import { leadershipTeam } from "@/lib/data/companyData";

import { generateMetadata, generateSchema } from "@/lib/seo-config";

export const metadata = generateMetadata({
  title: "PushpakO2 | Indian Aerospace & Aviation Innovation",
  description: "PushpakO2 is an Indian aerospace leader in indigenous aviation platforms, intelligent aerial systems, and advanced engineering. Driving innovation in Bhopal and across India.",
  keywords: ["Indian Aerospace", "Indigenous Aviation", "Autonomous Drones India", "Aerial Intelligence"],
  path: "/"
});

const jsonLdWebsite = generateSchema('WebSite', {
  "name": "PushpakO2",
  "url": "https://pushpako2.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://pushpako2.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});


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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />
      <Home teamData={teamData} />
    </div>
  )
}
