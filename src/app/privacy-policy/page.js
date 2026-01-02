

export const metadata = {
  title: "Privacy Policy | Pushpak O2",
  description: "Data privacy and protection policies of Pushpak O2."
}
const privacyContent = {
  title: "Privacy Policy",
  sections: [
    {
      heading: "Information Collection",
      text: "We collect only essential operational, technical and communication data required for service delivery, research collaboration and regulatory compliance."
    },
    {
      heading: "Data Protection",
      text: "All user and partner data is protected using aerospace-grade security protocols and encryption mechanisms."
    },
    {
      heading: "Third Party Sharing",
      text: "We do not share personal data with third parties unless required by aviation authorities or regulatory bodies."
    },
    {
      heading: "User Rights",
      text: "Users retain full control over their data with rights to access, correction and deletion."
    }
  ]
}

export default function page() {
  return (
    <section className="py-24 text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-bold mb-12">{privacyContent.title}</h1>

        <div className="space-y-8">
          {privacyContent.sections.map((sec) => (
            <div key={sec.heading} className="p-6 border border-white/10 rounded-xl hover:border-white/30 transition-all">
              <h3 className="text-xl font-semibold mb-2">{sec.heading}</h3>
              <p className="text-gray-300">{sec.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
