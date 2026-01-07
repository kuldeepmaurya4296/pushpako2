

"use client"

import { useState, useEffect } from "react"

export default function RoadmapClient() {
    const [roadmapData, setRoadmapData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/roadmap')
                if (!response.ok) {
                    throw new Error('Failed to fetch roadmap')
                }
                const data = await response.json()
                setRoadmapData(data || [])
                setError(null)
            } catch (err) {
                setError(err.message)
                console.error('Error fetching roadmap:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchRoadmap()
    }, [])

    if (loading) {
        return (
            <section className="py-24 text-white min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <span className="ml-3 text-gray-300">Loading roadmap...</span>
            </section>
        )
    }

    if (error) {
        return (
            <section className="py-24 text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Error loading roadmap</h2>
                    <p className="text-gray-500">{error}</p>
                </div>
            </section>
        )
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
  )
}
