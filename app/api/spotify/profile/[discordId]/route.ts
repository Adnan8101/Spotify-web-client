import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyConnection } from '@/lib/db';
import { decrypt } from '@/lib/crypto';
import axios from 'axios';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ discordId: string }> }
) {
  const { discordId } = await params;
  
  try {
    const connection = await getSpotifyConnection(discordId);
    
    if (!connection) {
      return NextResponse.json({ error: 'Not connected' }, { status: 404 });
    }

    // Decrypt access token
    const accessToken = decrypt(connection.access_token);

    // Fetch Spotify profile
    const [profileRes, playlistsRes, likedRes, followingRes] = await Promise.all([
      axios.get('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }),
      axios.get('https://api.spotify.com/v1/me/playlists?limit=50', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }),
      axios.get('https://api.spotify.com/v1/me/tracks?limit=1', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }),
      axios.get('https://api.spotify.com/v1/me/following?type=artist&limit=1', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
    ]);

    const profile = profileRes.data;
    const playlists = playlistsRes.data;
    const liked = likedRes.data;
    const following = followingRes.data;

    return NextResponse.json({
      display_name: profile.display_name || profile.id,
      image_url: profile.images?.[0]?.url || null,
      country: profile.country,
      product: profile.product || 'free',
      playlist_count: playlists.total || 0,
      liked_songs: liked.total || 0,
      following: following.artists?.total || 0
    });

  } catch (error) {
    console.error('Error fetching Spotify profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
