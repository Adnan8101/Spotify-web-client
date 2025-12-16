import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateState } from '@/lib/crypto';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const discordId = searchParams.get('discord_id');
  const username = searchParams.get('username');
  const avatar = searchParams.get('avatar');

  if (!discordId) {
    return new NextResponse('Missing Discord User ID', { status: 400 });
  }

  const state = generateState();
  
  // Store state and user info in cookies
  const cookieStore = await cookies();
  cookieStore.set('oauth_state', state, { httpOnly: true, maxAge: 600 });
  cookieStore.set('discord_id', discordId, { httpOnly: true, maxAge: 600 });
  if (username) cookieStore.set('discord_username', username, { httpOnly: true, maxAge: 600 });
  if (avatar) cookieStore.set('discord_avatar', avatar, { httpOnly: true, maxAge: 600 });

  const scopes = [
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-library-read',
    'user-top-read',
    'user-read-recently-played'
  ].join(' ');

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID!);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI!);
  authUrl.searchParams.append('scope', scopes);
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append('show_dialog', 'true');

  return NextResponse.redirect(authUrl);
}
