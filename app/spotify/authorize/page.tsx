'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function AuthorizeContent() {
  const searchParams = useSearchParams();
  const discordId = searchParams.get('discord_id');
  const username = searchParams.get('username');
  const avatar = searchParams.get('avatar');
  const [redirecting, setRedirecting] = useState(false);

  const avatarUrl = avatar 
    ? `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png?size=256`
    : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 5)}.png`;

  const handleConnect = () => {
    setRedirecting(true);
    const connectUrl = new URL('/spotify/connect', window.location.origin);
    connectUrl.searchParams.append('discord_id', discordId || '');
    connectUrl.searchParams.append('username', username || '');
    connectUrl.searchParams.append('avatar', avatar || '');
    window.location.href = connectUrl.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 max-w-md w-full text-center backdrop-blur-sm">
        {/* Discord User Info */}
        <div className="mb-8">
          <img 
            src={avatarUrl} 
            alt="Discord Avatar" 
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-zinc-800"
          />
          <h2 className="text-2xl font-bold text-white mb-2">
            {username || 'Discord User'}
          </h2>
          <p className="text-zinc-500 text-sm">ID: {discordId}</p>
        </div>

        {/* Spotify Logo */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Connect Spotify</h1>
        <p className="text-zinc-400 mb-8">
          Link your Spotify account to use your playlists, liked songs, and more with Exe Music bot.
        </p>

        {/* Connect Button */}
        <button
          onClick={handleConnect}
          disabled={redirecting}
          className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {redirecting ? 'Redirecting...' : 'Connect with Spotify'}
        </button>

        <p className="text-zinc-600 text-xs mt-6">
          You'll be redirected to Spotify to authorize the connection
        </p>
      </div>
    </div>
  );
}

export default function SpotifyAuthorize() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <AuthorizeContent />
    </Suspense>
  );
}
