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

    const accessToken = decrypt(connection.access_token);

    // Fetch user's playlists
    const response = await axios.get('https://api.spotify.com/v1/me/playlists?limit=50', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    const playlists = response.data.items.map((playlist: any) => ({
      id: playlist.id,
      name: playlist.name,
      tracks: playlist.tracks.total,
      public: playlist.public,
      image: playlist.images?.[0]?.url || null,
      uri: playlist.uri,
      url: playlist.external_urls.spotify
    }));

    return NextResponse.json({ playlists });

  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: 'Failed to fetch playlists' }, { status: 500 });
  }
}
