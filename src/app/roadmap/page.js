

export const metadata = {
  title: "Roadmap | Pushpak O2",
  description: "Strategic growth and development roadmap."
}
const roadmapData = {
  title: "Company Roadmap",
  stages: [
    { year: "2024", goal: "Prototype Flight Validation" },
    { year: "2025", goal: "Regulatory Certification & Manufacturing Scale" },
    { year: "2026", goal: "Commercial Launch" },
    { year: "2028", goal: "Global Expansion & Fleet Programs" }
  ]
}

export default function RoadmapClient() {
  return (
    <section className="py-24 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-14">{roadmapData.title}</h1>

        <div className="grid md:grid-cols-4 gap-8">
          {roadmapData.stages.map((s) => (
            <div key={s.year} className="p-8 border border-white/10 rounded-xl hover:border-white/30 transition-all">
              <h3 className="text-3xl font-bold mb-2">{s.year}</h3>
              <p className="text-gray-300">{s.goal}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
