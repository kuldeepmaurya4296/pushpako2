'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function DataTest() {
    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState({})

    useEffect(() => {
        const fetchAllData = async () => {
            const endpoints = [
                { name: 'blogs', url: '/api/blogs' },
                { name: 'services', url: '/api/services' },
                { name: 'technologies', url: '/api/technologies' },
                { name: 'users', url: '/api/users' },
                { name: 'investors', url: '/api/investors' },
                { name: 'team', url: '/api/team' },
                { name: 'aboutUs', url: '/api/about-us' },
                { name: 'roadmap', url: '/api/roadmap' },
            ]

            const data = {}

            for (const endpoint of endpoints) {
                try {
                    console.log(`Fetching ${endpoint.name}...`)
                    const response = await fetch(endpoint.url)
                    const result = await response.json()

                    if (response.ok) {
                        console.log(`${endpoint.name} data:`, result)
                        data[endpoint.name] = { success: true, data: result }
                    } else {
                        console.error(`${endpoint.name} error:`, result)
                        data[endpoint.name] = { success: false, error: result }
                    }
                } catch (error) {
                    console.error(`${endpoint.name} fetch error:`, error)
                    data[endpoint.name] = { success: false, error: error.message }
                }
            }

            // Test individual blog retrieval
            try {
                console.log('Testing individual blog retrieval...')
                const blogsResponse = await fetch('/api/blogs')
                const blogsData = await blogsResponse.json()

                if (blogsResponse.ok && blogsData.blogs && blogsData.blogs.length > 0) {
                    const firstBlog = blogsData.blogs[0]
                    console.log('Fetching first blog by ID...')
                    const blogByIdResponse = await fetch(`/api/blogs/${firstBlog._id}`)
                    const blogById = await blogByIdResponse.json()
                    console.log('Blog by ID:', blogById)

                    console.log('Fetching first blog by slug...')
                    const blogBySlugResponse = await fetch(`/api/blogs/${firstBlog.slug}`)
                    const blogBySlug = await blogBySlugResponse.json()
                    console.log('Blog by slug:', blogBySlug)
                }
            } catch (error) {
                console.error('Individual blog retrieval error:', error)
            }

            setResults(data)
            setLoading(false)
            console.log('All data fetching completed!')
        }

        fetchAllData()
    }, [])

    if (loading) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Data Test Component</h1>
                <p>Loading... Check console for API call results</p>
            </div>
        )
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Data Test Component</h1>
            <p className="mb-4">All API calls completed. Check browser console for detailed results.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(results).map(([key, value]) => (
                    <Link href={`/api/${key}` } target='_blank' >
                        <div key={key} className="border rounded-lg p-4">
                            <h3 className="font-semibold capitalize">{key}</h3>
                            <p className={`text-sm ${value.success ? 'text-green-600' : 'text-red-600'}`}>
                                {value.success ? 'Success' : 'Failed'}
                            </p>
                            {value.success && value.data && (
                                <p className="text-xs text-gray-600 mt-1">
                                    {Array.isArray(value.data) ? `${value.data.length} items` :
                                        typeof value.data === 'object' && value.data.total ? `${value.data.total} items` :
                                            'Data received'}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}