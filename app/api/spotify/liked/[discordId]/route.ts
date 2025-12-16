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

    // Fetch liked songs
    const response = await axios.get('https://api.spotify.com/v1/me/tracks?limit=50', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    const tracks = response.data.items.map((item: any) => ({
      name: item.track.name,
      artist: item.track.artists[0].name,
      uri: item.track.uri,
      added_at: item.added_at
    }));

    return NextResponse.json({ 
      total: response.data.total,
      tracks 
    });

  } catch (error) {
    console.error('Error fetching liked songs:', error);
    return NextResponse.json({ error: 'Failed to fetch liked songs' }, { status: 500 });
  }
}
