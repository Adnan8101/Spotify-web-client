export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 blur-2xl opacity-50 animate-pulse"></div>
            <svg width="100" height="100" viewBox="0 0 40 40" className="relative">
              <circle cx="20" cy="20" r="18" fill="url(#gradient1)"/>
              <path d="M15 13L28 20L15 27V13Z" fill="white"/>
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stopColor="#1DB954"/>
                  <stop offset="100%" stopColor="#1ed760"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
          Exe Music
        </h1>

        {/* Coming Soon */}
        <div className="mb-8">
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full backdrop-blur-sm">
            <span className="text-green-400 font-semibold text-lg tracking-wider uppercase">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Premium Discord Music Bot with Spotify Integration
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-green-500/30 transition-all">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              10K+
            </div>
            <div className="text-zinc-500 text-sm mt-1">Servers</div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-green-500/30 transition-all">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              500K+
            </div>
            <div className="text-zinc-500 text-sm mt-1">Users</div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-green-500/30 transition-all">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              99.9%
            </div>
            <div className="text-zinc-500 text-sm mt-1">Uptime</div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-400 text-sm">
            🎵 Crystal Clear Audio
          </span>
          <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-400 text-sm">
            🎧 Spotify Integration
          </span>
          <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-400 text-sm">
            ⚡ Lightning Fast
          </span>
          <span className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-400 text-sm">
            🔒 Secure & Private
          </span>
        </div>

        {/* Footer */}
        <p className="text-zinc-600 text-sm">
          Made with ❤️ by Byte
        </p>
      </div>
    </div>
  );
}
