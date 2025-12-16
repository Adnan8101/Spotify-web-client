import { NextRequest, NextResponse } from 'next/server';
import { deleteSpotifyConnection } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ discordId: string }> }
) {
  const { discordId } = await params;
  
  try {
    await deleteSpotifyConnection(discordId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
