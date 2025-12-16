'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SpotifyResult() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const message = searchParams.get('message');
  const spotifyUser = searchParams.get('spotify_user');

  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => {
        window.close();
      }, 5000);
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 max-w-md w-full text-center backdrop-blur-sm">
        {status === 'success' ? (
          <>
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Successfully Connected!</h1>
            <p className="text-zinc-400 mb-6">
              Your Spotify account {spotifyUser && `(${spotifyUser})`} is now linked to Exe Music!
            </p>
            <p className="text-zinc-500 text-sm">This window will close automatically in 5 seconds...</p>
          </>
        ) : (
          <>
            <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Connection Failed</h1>
            <p className="text-zinc-400 mb-6">{message || 'An error occurred'}</p>
            <a href="/" className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
              Back to Home
            </a>
          </>
        )}
      </div>
    </div>
  );
}
