import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { discord_id, spotify_user, spotify_image, discord_username } = body;

    if (!discord_id) {
      return NextResponse.json({ error: 'Missing discord_id' }, { status: 400 });
    }

    // Send notification to Discord bot to DM the user
    const botNotificationUrl = process.env.BOT_NOTIFICATION_ENDPOINT || 'http://localhost:8080/api/notify/spotify-connected';
    
    await axios.post(botNotificationUrl, {
      discord_id,
      spotify_user,
      spotify_image,
      discord_username
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.BOT_API_KEY || ''
      },
      timeout: 5000
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
