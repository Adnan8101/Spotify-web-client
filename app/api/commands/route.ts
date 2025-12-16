import { NextResponse } from 'next/server';

export async function GET() {
  const commands = {
    metadata: {
      totalCommands: 63,
      totalCategories: 8,
      botVersion: "3.0.0",
      lastUpdated: "2024-12-16"
    },
    categories: [
      {
        id: "botinfo",
        name: "Bot Info",
        icon: "",
        description: "Get information about the bot",
        commands: [
          {
            name: "about",
            description: "Get detailed information about the bot, including version and uptime",
            aliases: ["info", "botinfo"],
            usage: "/about",
            examples: ["/about"],
            category: "botinfo"
          },
          {
            name: "ping",
            description: "Check the bot's latency and response time",
            aliases: ["latency"],
            usage: "/ping",
            examples: ["/ping"],
            category: "botinfo"
          },
          {
            name: "shards",
            description: "View shard statistics and status",
            aliases: ["shard"],
            usage: "/shards",
            examples: ["/shards"],
            category: "botinfo"
          },
          {
            name: "leaderboard",
            description: "View server or global leaderboards",
            aliases: ["lb", "top"],
            usage: "/leaderboard [scope]",
            examples: ["/leaderboard", "/leaderboard server", "/leaderboard global"],
            category: "botinfo"
          },
          {
            name: "help",
            description: "Get help and view all available commands",
            aliases: ["commands"],
            usage: "/help",
            examples: ["/help"],
            category: "botinfo"
          }
        ]
      },
      {
        id: "playback",
        name: "Playback",
        icon: "",
        description: "Control music playback",
        commands: [
          {
            name: "play",
            description: "Play a song, playlist, or search query",
            aliases: ["p"],
            usage: "/play <song name or URL>",
            examples: [
              "/play Bohemian Rhapsody",
              "/play https://youtube.com/watch?v=...",
              "/play https://open.spotify.com/track/..."
            ],
            category: "playback"
          },
          {
            name: "pause",
            description: "Pause the current track",
            aliases: [],
            usage: "/pause",
            examples: ["/pause"],
            category: "playback"
          },
          {
            name: "resume",
            description: "Resume playback",
            aliases: ["unpause"],
            usage: "/resume",
            examples: ["/resume"],
            category: "playback"
          },
          {
            name: "stop",
            description: "Stop playback and clear the queue",
            aliases: ["disconnect"],
            usage: "/stop",
            examples: ["/stop"],
            category: "playback"
          },
          {
            name: "join",
            description: "Make the bot join your voice channel",
            aliases: ["connect", "summon"],
            usage: "/join",
            examples: ["/join"],
            category: "playback"
          },
          {
            name: "leave",
            description: "Make the bot leave the voice channel",
            aliases: ["dc"],
            usage: "/leave",
            examples: ["/leave"],
            category: "playback"
          },
          {
            name: "next",
            description: "Skip to the next track in queue",
            aliases: ["skip", "s"],
            usage: "/next",
            examples: ["/next"],
            category: "playback"
          },
          {
            name: "skip",
            description: "Skip the current track",
            aliases: ["next", "s"],
            usage: "/skip",
            examples: ["/skip"],
            category: "playback"
          },
          {
            name: "previous",
            description: "Play the previous track",
            aliases: ["prev", "back"],
            usage: "/previous",
            examples: ["/previous"],
            category: "playback"
          },
          {
            name: "nowplaying",
            description: "Show information about the currently playing track",
            aliases: ["np", "current"],
            usage: "/nowplaying",
            examples: ["/nowplaying"],
            category: "playback"
          },
          {
            name: "nextup",
            description: "View the next track in queue",
            aliases: ["nu"],
            usage: "/nextup",
            examples: ["/nextup"],
            category: "playback"
          },
          {
            name: "volume",
            description: "Adjust the playback volume (0-150)",
            aliases: ["vol", "v"],
            usage: "/volume <0-150>",
            examples: ["/volume 50", "/volume 100"],
            category: "playback"
          },
          {
            name: "auto",
            description: "Toggle autoplay mode",
            aliases: ["autoplay"],
            usage: "/auto",
            examples: ["/auto"],
            category: "playback"
          }
        ]
      },
      {
        id: "queue",
        name: "Queue",
        icon: "",
        description: "Manage the music queue",
        commands: [
          {
            name: "queue",
            description: "View the current music queue",
            aliases: ["q", "list"],
            usage: "/queue [page]",
            examples: ["/queue", "/queue 2"],
            category: "queue"
          },
          {
            name: "shuffle",
            description: "Shuffle the queue",
            aliases: ["mix"],
            usage: "/shuffle",
            examples: ["/shuffle"],
            category: "queue"
          },
          {
            name: "reverse",
            description: "Reverse the order of the queue",
            aliases: [],
            usage: "/reverse",
            examples: ["/reverse"],
            category: "queue"
          },
          {
            name: "loop",
            description: "Set loop mode (off/track/queue)",
            aliases: ["repeat"],
            usage: "/loop <mode>",
            examples: ["/loop off", "/loop track", "/loop queue"],
            category: "queue"
          },
          {
            name: "move",
            description: "Move a track to a different position in queue",
            aliases: [],
            usage: "/move <from> <to>",
            examples: ["/move 3 1", "/move 5 2"],
            category: "queue"
          },
          {
            name: "skipto",
            description: "Skip to a specific track in queue",
            aliases: ["jumpto", "goto"],
            usage: "/skipto <position>",
            examples: ["/skipto 5", "/skipto 10"],
            category: "queue"
          },
          {
            name: "remove",
            description: "Remove tracks from queue",
            aliases: ["rm", "delete"],
            usage: "/remove <subcommand>",
            examples: [
              "/remove current",
              "/remove duplicates",
              "/remove keyword <text>",
              "/remove last",
              "/remove range <start> <end>",
              "/remove user <@user>"
            ],
            category: "queue"
          },
          {
            name: "clearqueue",
            description: "Clear the entire queue",
            aliases: ["clear", "cq"],
            usage: "/clearqueue",
            examples: ["/clearqueue"],
            category: "queue"
          },
          {
            name: "playlist",
            description: "Search and play playlists",
            aliases: ["pl"],
            usage: "/playlist search <query>",
            examples: ["/playlist search chill vibes"],
            category: "queue"
          }
        ]
      },
      {
        id: "spotify",
        name: "Spotify",
        icon: "",
        description: "Spotify integration features",
        commands: [
          {
            name: "spotify-connect",
            description: "Connect your Spotify account",
            aliases: ["spotifyconnect"],
            usage: "/spotify-connect",
            examples: ["/spotify-connect"],
            category: "spotify"
          },
          {
            name: "spotify-disconnect",
            description: "Disconnect your Spotify account",
            aliases: ["spotifydisconnect"],
            usage: "/spotify-disconnect",
            examples: ["/spotify-disconnect"],
            category: "spotify"
          },
          {
            name: "spotify-status",
            description: "Check your Spotify connection status",
            aliases: ["spotifystatus"],
            usage: "/spotify-status",
            examples: ["/spotify-status"],
            category: "spotify"
          },
          {
            name: "spotify-info",
            description: "View your Spotify profile information",
            aliases: ["spotifyinfo", "spotifyprofile"],
            usage: "/spotify-info",
            examples: ["/spotify-info"],
            category: "spotify"
          },
          {
            name: "spotify-playlists",
            description: "View your Spotify playlists",
            aliases: ["spotifyplaylists"],
            usage: "/spotify-playlists",
            examples: ["/spotify-playlists"],
            category: "spotify"
          },
          {
            name: "spotify-liked",
            description: "Play your Spotify liked songs",
            aliases: ["spotifyliked"],
            usage: "/spotify-liked",
            examples: ["/spotify-liked"],
            category: "spotify"
          },
          {
            name: "spotify-top",
            description: "View your top tracks or artists",
            aliases: ["spotifytop"],
            usage: "/spotify-top <type>",
            examples: ["/spotify-top tracks", "/spotify-top artists"],
            category: "spotify"
          }
        ]
      },
      {
        id: "user",
        name: "User",
        icon: "",
        description: "User profile and statistics",
        commands: [
          {
            name: "profile",
            description: "View your or another user's profile",
            aliases: ["userinfo"],
            usage: "/profile [@user]",
            examples: ["/profile", "/profile @username"],
            category: "user"
          },
          {
            name: "requested",
            description: "View tracks you've requested",
            aliases: [],
            usage: "/requested",
            examples: ["/requested"],
            category: "user"
          },
          {
            name: "topsongs",
            description: "View top songs",
            aliases: [],
            usage: "/topsongs",
            examples: ["/topsongs"],
            category: "user"
          },
          {
            name: "recentlyplayed",
            description: "View your recently played tracks",
            aliases: ["recent", "history"],
            usage: "/recentlyplayed",
            examples: ["/recentlyplayed"],
            category: "user"
          },
          {
            name: "save",
            description: "Save the current track to your DMs",
            aliases: [],
            usage: "/save",
            examples: ["/save"],
            category: "user"
          }
        ]
      },
      {
        id: "lyrics",
        name: "Lyrics",
        icon: "",
        description: "Search and view song lyrics",
        commands: [
          {
            name: "lyrics",
            description: "Get lyrics for the current or specified song",
            aliases: ["ly"],
            usage: "/lyrics [song name]",
            examples: ["/lyrics", "/lyrics Bohemian Rhapsody"],
            category: "lyrics"
          },
          {
            name: "searchlyrics",
            description: "Search for songs by lyrics",
            aliases: ["findlyrics"],
            usage: "/searchlyrics <lyrics>",
            examples: ["/searchlyrics just a small town girl"],
            category: "lyrics"
          }
        ]
      },
      {
        id: "audio",
        name: "Audio Effects",
        icon: "",
        description: "Audio filters and effects",
        commands: [
          {
            name: "dsp",
            description: "Apply audio filters and effects (bass boost, nightcore, etc.)",
            aliases: ["filter", "effect"],
            usage: "/dsp <filter>",
            examples: [
              "/dsp bassboost",
              "/dsp nightcore",
              "/dsp vaporwave",
              "/dsp 8d",
              "/dsp clear"
            ],
            category: "audio"
          }
        ]
      },
      {
        id: "playlist",
        name: "Personal Playlists",
        icon: "",
        description: "Create and manage your personal playlists",
        commands: [
          {
            name: "playlist-create",
            description: "Create a new personal playlist",
            aliases: [],
            usage: "/playlist-create <name> [description]",
            examples: [
              "/playlist-create My Favorites",
              "/playlist-create Chill Vibes A relaxing collection"
            ],
            category: "playlist"
          },
          {
            name: "playlist-list",
            description: "View all your playlists",
            aliases: [],
            usage: "/playlist-list",
            examples: ["/playlist-list"],
            category: "playlist"
          },
          {
            name: "playlist-info",
            description: "Get detailed information about a playlist",
            aliases: [],
            usage: "/playlist-info <playlist-id>",
            examples: ["/playlist-info 1", "/playlist-info 5"],
            category: "playlist"
          },
          {
            name: "playlist-play",
            description: "Play a personal playlist",
            aliases: [],
            usage: "/playlist-play <playlist-id> [shuffle]",
            examples: [
              "/playlist-play 1",
              "/playlist-play 3 shuffle:true"
            ],
            category: "playlist"
          },
          {
            name: "playlist-add",
            description: "Add a track to a playlist by URL or query",
            aliases: [],
            usage: "/playlist-add <playlist-id> <query>",
            examples: [
              "/playlist-add 1 Bohemian Rhapsody",
              "/playlist-add 2 https://youtube.com/watch?v=..."
            ],
            category: "playlist"
          },
          {
            name: "playlist-add-current",
            description: "Add the currently playing track to a playlist",
            aliases: [],
            usage: "/playlist-add-current <playlist-id>",
            examples: ["/playlist-add-current 1"],
            category: "playlist"
          },
          {
            name: "playlist-add-queue",
            description: "Add all tracks from the current queue to a playlist",
            aliases: [],
            usage: "/playlist-add-queue <playlist-id>",
            examples: ["/playlist-add-queue 1"],
            category: "playlist"
          },
          {
            name: "playlist-remove",
            description: "Remove a track from a playlist",
            aliases: [],
            usage: "/playlist-remove <playlist-id> <position>",
            examples: [
              "/playlist-remove 1 3",
              "/playlist-remove 2 1"
            ],
            category: "playlist"
          },
          {
            name: "playlist-clear",
            description: "Clear all tracks from a playlist",
            aliases: [],
            usage: "/playlist-clear <playlist-id>",
            examples: ["/playlist-clear 1"],
            category: "playlist"
          },
          {
            name: "playlist-delete",
            description: "Delete a personal playlist",
            aliases: [],
            usage: "/playlist-delete <playlist-id>",
            examples: ["/playlist-delete 1"],
            category: "playlist"
          },
          {
            name: "playlist-rename",
            description: "Rename a playlist",
            aliases: [],
            usage: "/playlist-rename <playlist-id> <new-name>",
            examples: ["/playlist-rename 1 My Best Songs"],
            category: "playlist"
          },
          {
            name: "playlist-move",
            description: "Move a track to a different position in playlist",
            aliases: [],
            usage: "/playlist-move <playlist-id> <from> <to>",
            examples: ["/playlist-move 1 5 2"],
            category: "playlist"
          },
          {
            name: "playlist-shuffle",
            description: "Shuffle all tracks in a playlist",
            aliases: [],
            usage: "/playlist-shuffle <playlist-id>",
            examples: ["/playlist-shuffle 1"],
            category: "playlist"
          },
          {
            name: "playlist-reverse",
            description: "Reverse the order of tracks in a playlist",
            aliases: [],
            usage: "/playlist-reverse <playlist-id>",
            examples: ["/playlist-reverse 1"],
            category: "playlist"
          },
          {
            name: "playlist-dedupe",
            description: "Remove duplicate tracks from a playlist",
            aliases: [],
            usage: "/playlist-dedupe <playlist-id>",
            examples: ["/playlist-dedupe 1"],
            category: "playlist"
          },
          {
            name: "playlist-privacy",
            description: "Change playlist privacy settings",
            aliases: [],
            usage: "/playlist-privacy <playlist-id> <privacy>",
            examples: [
              "/playlist-privacy 1 PRIVATE",
              "/playlist-privacy 2 PUBLIC",
              "/playlist-privacy 3 UNLISTED"
            ],
            category: "playlist"
          },
          {
            name: "playlist-clone",
            description: "Create a copy of a playlist",
            aliases: [],
            usage: "/playlist-clone <playlist-id> [new-name]",
            examples: [
              "/playlist-clone 1",
              "/playlist-clone 2 Backup Playlist"
            ],
            category: "playlist"
          },
          {
            name: "playlist-export",
            description: "Export playlist to a shareable format",
            aliases: [],
            usage: "/playlist-export <playlist-id>",
            examples: ["/playlist-export 1"],
            category: "playlist"
          },
          {
            name: "playlist-import-spotify",
            description: "Import a Spotify playlist",
            aliases: [],
            usage: "/playlist-import-spotify <spotify-url> <name>",
            examples: [
              "/playlist-import-spotify https://open.spotify.com/playlist/... My Imported Playlist"
            ],
            category: "playlist"
          }
        ]
      },
      {
        id: "vctitle",
        name: "Voice Channel Title",
        icon: "",
        description: "Voice channel title configuration",
        commands: [
          {
            name: "vctitle-enable",
            description: "Enable voice channel status sync to currently playing song",
            aliases: [],
            usage: "/vctitle-enable",
            examples: ["/vctitle-enable"],
            category: "vctitle"
          },
          {
            name: "vctitle-disable",
            description: "Disable voice channel status sync",
            aliases: [],
            usage: "/vctitle-disable",
            examples: ["/vctitle-disable"],
            category: "vctitle"
          }
        ]
      }
    ]
  };

  return NextResponse.json(commands);
}
