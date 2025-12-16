import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyConnection } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ discordId: string }> }
) {
  const { discordId } = await params;
  
  try {
    const connection = await getSpotifyConnection(discordId);
    return NextResponse.json({ connected: !!connection });
  } catch (error) {
    return NextResponse.json({ connected: false, error: 'Database error' }, { status: 500 });
  }
}
