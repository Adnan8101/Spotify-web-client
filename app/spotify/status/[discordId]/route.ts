import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyConnection } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ discordId: string }> }
) {
  const { discordId } = await params;
  
  try {
    const connection = await getSpotifyConnection(discordId);
    
    if (connection) {
      return NextResponse.json({
        connected: true,
        spotify_user_id: connection.spotify_user_id,
        connected_at: connection.created_at,
        last_used: connection.updated_at
      });
    } else {
      return NextResponse.json({ connected: false });
    }
  } catch (_error) {
    return NextResponse.json({ connected: false, error: 'Database error' }, { status: 500 });
  }
}
