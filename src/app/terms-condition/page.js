
export const metadata = {
  title: "Terms & Conditions | Pushpak O2",
  description: "Operational and usage terms of Pushpak O2 technologies."
}

const termsContent = {
  title: "Terms & Conditions",
  points: [
    "All flight operations comply with global aviation regulations and safety standards.",
    "Use of Pushpak O2 technology constitutes agreement with operational policies.",
    "Unauthorized reproduction of proprietary systems is prohibited.",
    "Liability is limited as per aerospace regulatory frameworks."
  ]
}

export default function TermsClient() {
  return (
    <section className="py-24 text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-bold mb-12">{termsContent.title}</h1>

        <ul className="space-y-6">
          {termsContent.points.map((p, i) => (
            <li key={i} className="p-6 border border-white/10 rounded-xl hover:border-white/30 transition-all text-gray-300">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
