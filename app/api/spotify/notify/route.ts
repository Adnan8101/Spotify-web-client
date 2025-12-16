import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { discord_id, spotify_user, spotify_image, discord_username } = body;

    if (!discord_id) {
      return NextResponse.json({ error: 'Missing discord_id' }, { status: 400 });
    }

    // Store notification in a file for bot to poll
    const notificationsDir = join(process.cwd(), '..', 'logs', 'notifications');
    try {
      await mkdir(notificationsDir, { recursive: true });
    } catch (e) {
      // Directory already exists
    }

    const notificationFile = join(notificationsDir, `${discord_id}_${Date.now()}.json`);
    await writeFile(notificationFile, JSON.stringify({
      discord_id,
      spotify_user,
      spotify_image,
      discord_username,
      timestamp: new Date().toISOString()
    }));

    console.log(`Saved notification for user ${discord_id}`);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return pending notifications for bot to process
    const notificationsDir = join(process.cwd(), '..', 'logs', 'notifications');
    const fs = require('fs').promises;
    
    try {
      const files = await fs.readdir(notificationsDir);
      const notifications = [];
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await fs.readFile(join(notificationsDir, file), 'utf-8');
          const notification = JSON.parse(content);
          notifications.push({ ...notification, filename: file });
        }
      }
      
      return NextResponse.json({ notifications });
    } catch (e) {
      return NextResponse.json({ notifications: [] });
    }

  } catch (error) {
    console.error('Error getting notifications:', error);
    return NextResponse.json({ error: 'Failed to get notifications' }, { status: 500 });
  }
}
