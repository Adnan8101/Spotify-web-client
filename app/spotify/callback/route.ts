import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import { encrypt } from '@/lib/crypto';
import { saveSpotifyConnection } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL(`/spotify/result?status=error&message=${encodeURIComponent('Connection denied')}`, request.url));
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get('oauth_state')?.value;
  const discordId = cookieStore.get('discord_id')?.value;
  const discordUsername = cookieStore.get('discord_username')?.value;
  const discordAvatar = cookieStore.get('discord_avatar')?.value;

  if (!state || state !== savedState) {
    return NextResponse.redirect(new URL('/spotify/result?status=error&message=Invalid%20state', request.url));
  }

  if (!discordId) {
    return NextResponse.redirect(new URL('/spotify/result?status=error&message=Missing%20Discord%20ID', request.url));
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code!,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Get Spotify user info
    const userResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': `Bearer ${access_token}` }
    });

    const spotifyUser = userResponse.data;

    // Save to database
    const expiresAt = new Date(Date.now() + expires_in * 1000);
    await saveSpotifyConnection({
      discordId,
      spotifyUserId: spotifyUser.id,
      accessToken: encrypt(access_token),
      refreshToken: encrypt(refresh_token),
      expiresAt,
      discordUsername,
      discordAvatar
    });

    // Clear cookies
    cookieStore.delete('oauth_state');
    cookieStore.delete('discord_id');
    cookieStore.delete('discord_username');
    cookieStore.delete('discord_avatar');

    return NextResponse.redirect(
      new URL(`/spotify/result?status=success&spotify_user=${encodeURIComponent(spotifyUser.display_name || spotifyUser.id)}`, request.url)
    );

  } catch (err) {
    console.error('OAuth error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Connection failed';
    return NextResponse.redirect(
      new URL(`/spotify/result?status=error&message=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}
