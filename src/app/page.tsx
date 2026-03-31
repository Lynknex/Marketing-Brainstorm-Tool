import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  // If already logged in, redirect to campaigns
  if (session?.user) {
    redirect('/campaigns')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Marketing Campaign Brainstorm Tool
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            AI-powered campaign planning with Claude. Create comprehensive LinkedIn marketing campaigns in minutes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Design</h3>
            <p className="text-gray-400">Claude generates complete campaign strategies with 10-20 detailed post concepts</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Visual Calendar</h3>
            <p className="text-gray-400">Week-by-week view with post scheduling and content management</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="text-xl font-semibold mb-2">Export Ready</h3>
            <p className="text-gray-400">Download as Markdown or PDF for implementation and stakeholder review</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/campaigns"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started →
          </Link>
          <p className="text-gray-400 mt-4 text-sm">Sign in required • Free to use</p>
        </div>

        {/* Tech Stack */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm mb-4">Powered by</p>
          <div className="flex justify-center gap-8 text-gray-400 text-sm">
            <span>Next.js 16</span>
            <span>•</span>
            <span>Claude AI</span>
            <span>•</span>
            <span>Prisma</span>
            <span>•</span>
            <span>PostgreSQL</span>
          </div>
        </div>
      </div>
    </div>
  )
}
