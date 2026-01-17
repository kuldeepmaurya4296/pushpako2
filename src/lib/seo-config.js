export const SEO_CONFIG = {
    siteName: "PushpakO2",
    title: {
        default: "PushpakO2 | Indian Aerospace & Advanced Engineering Authority",
        template: "%s | PushpakO2 - Indigenous Aviation Innovation"
    },
    description: "PushpakO2 is India's premier indigenous aerospace company in Bhopal, specializing in advanced aviation platforms, intelligent aerial systems, and unmanned drones. We pioneer self-reliant, AI-enabled aviation technologies.",
    siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://pushpako2.com",
    keywords: [
        // Brand & Typos (Critical for rank capture)
        "PushpakO2", "Pushpak O2", "pushpako2", "Pushpak O2 Aerospace", "Pushpak O2 Aviation",
        "pushpak02", "pushpako", "pushpak o two", "Pushpak O2 India",

        // Local - Bhopal
        "PushpakO2 Bhopal", "Pushpak O2 Bhopal", "pushpako2 near me", "pushpak in bhopal",
        "aerospace company in bhopal", "aviation startup in bhopal", "innovation in bhopal", "inovation in bhopal",
        // Industry & Authority
        "Indian aerospace company", "advanced engineering company India", "indigenous aviation platforms",
        "intelligent aerial systems", "unmanned aerial systems India", "UAS India", "fixed wing drone", "VTOL aircraft India", "in-house aerospace development",
        "aerospace IP ownership", "aviation system integration", "next-generation aviation",
        "AI-enabled aviation systems", "advanced avionics & propulsion", "aerial intelligence systems",
        "sustainable aviation solutions", "mission-ready aerial platforms", "environmental monitoring drones",
        "surveillance and smart infrastructure systems"
    ],
    authors: [
        { name: "PushpakO2 Team", url: "https://pushpako2.com/our-team" },
        { name: "Aneerudh Kumar", url: "https://pushpako2.com/our-team" },
        { name: "Aditya Shrivastava", url: "https://pushpako2.com/our-team" }
    ],
    social: {
        twitter: "https://twitter.com/pushpako2", // Update if real handle is known
        linkedin: "https://www.linkedin.com/company/pushpako2", // Update if real handle is known
        instagram: "https://www.instagram.com/pushpako2" // Update if real handle is known
    },
    location: {
        address: "Pushpako2 Second Floor, 11, Aadi Parishar, Bagsewaniya, Sant Ashram Nagar, Bhel Sangam Colony, Face2",
        city: "Bhopal",
        state: "Madhya Pradesh",
        country: "India",
        postalCode: "462026" // Assuming based on Bagsewaniya
    }
};

export const generateMetadata = (pageConfig) => {
    const baseTitle = pageConfig.title || SEO_CONFIG.title.default;
    const description = pageConfig.description || SEO_CONFIG.description;
    const url = `${SEO_CONFIG.siteUrl}${pageConfig.path || ""}`;

    return {
        title: baseTitle,
        description: description,
        keywords: [...SEO_CONFIG.keywords, ...(pageConfig.keywords || [])],
        authors: SEO_CONFIG.authors,
        metadataBase: new URL(SEO_CONFIG.siteUrl),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: baseTitle,
            description: description,
            url: url,
            siteName: SEO_CONFIG.siteName,
            locale: 'en_IN',
            type: 'website',
            images: [
                {
                    url: pageConfig.image || '/og-image.jpg', // Ensure this image exists
                    width: 1200,
                    height: 630,
                    alt: baseTitle,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: baseTitle,
            description: description,
            images: [pageConfig.image || '/og-image.jpg'],
            creator: '@pushpako2',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
};

export const generateSchema = (type, data) => {
    const baseSchema = {
        "@context": "https://schema.org",
    };

    if (type === 'Organization') {
        return {
            ...baseSchema,
            "@type": "Organization",
            "@id": `${SEO_CONFIG.siteUrl}/#organization`,
            "name": SEO_CONFIG.siteName,
            "alternateName": ["Pushpak O2", "Pushpako2", "Pushpak02", "Pushpak O Two"],
            "url": SEO_CONFIG.siteUrl,
            "logo": `${SEO_CONFIG.siteUrl}/pushpako2.png`,
            "sameAs": Object.values(SEO_CONFIG.social),
            "address": {
                "@type": "PostalAddress",
                "streetAddress": SEO_CONFIG.location.address,
                "addressLocality": SEO_CONFIG.location.city,
                "addressRegion": SEO_CONFIG.location.state,
                "postalCode": SEO_CONFIG.location.postalCode,
                "addressCountry": "IN"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-8085613350",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": "en"
            }
        };
    }

    if (type === 'LocalBusiness') {
        return {
            ...baseSchema,
            "@type": "AerospaceCompany", // More specific local business type if allowed, otherwise LocalBusiness
            "additionalType": "LocalBusiness",
            "@id": `${SEO_CONFIG.siteUrl}/#localbusiness`,
            "name": "PushpakO2 Aerospace Bhopal",
            "image": `${SEO_CONFIG.siteUrl}/pushpako2.png`,
            "url": SEO_CONFIG.siteUrl,
            "telephone": "+91-8085613350",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": SEO_CONFIG.location.address,
                "addressLocality": SEO_CONFIG.location.city,
                "addressRegion": SEO_CONFIG.location.state,
                "postalCode": SEO_CONFIG.location.postalCode,
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "23.2599", // Approx for Bhopal, user to refine if specific lat/long known
                "longitude": "77.4126"
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
            }
        };
    }

    return { ...baseSchema, ...data };
};
