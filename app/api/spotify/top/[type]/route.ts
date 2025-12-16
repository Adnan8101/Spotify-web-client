import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyConnection } from '@/lib/db';
import { decrypt } from '@/lib/crypto';
import axios from 'axios';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const searchParams = request.nextUrl.searchParams;
  const discordId = searchParams.get('discord_id');
  const timeframe = searchParams.get('timeframe') || 'medium_term';
  
  if (!discordId) {
    return NextResponse.json({ error: 'Missing discord_id' }, { status: 400 });
  }

  // Map timeframe
  const timeRangeMap: Record<string, string> = {
    'short': 'short_term',
    'medium': 'medium_term',
    'long': 'long_term'
  };
  const timeRange = timeRangeMap[timeframe] || 'medium_term';

  try {
    const connection = await getSpotifyConnection(discordId);
    
    if (!connection) {
      return NextResponse.json({ error: 'Not connected' }, { status: 404 });
    }

    const accessToken = decrypt(connection.access_token);

    // Fetch top items
    const endpoint = type === 'tracks' ? 'tracks' : 'artists';
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/${endpoint}?time_range=${timeRange}&limit=50`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );

    const items = response.data.items.map((item: any) => {
      if (type === 'tracks') {
        return {
          name: item.name,
          artist: item.artists[0].name,
          uri: item.uri
        };
      } else {
        return {
          name: item.name,
          genres: item.genres,
          uri: item.uri
        };
      }
    });

    return NextResponse.json({ items });

  } catch (error) {
    console.error('Error fetching top items:', error);
    return NextResponse.json({ error: 'Failed to fetch top items' }, { status: 500 });
  }
}
