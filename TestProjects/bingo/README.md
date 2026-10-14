# Bingo

A self-contained, offline-friendly Bingo Progressive Web App (PWA) in a single HTML file. No build step, no server, no sign-up - everything runs locally in your browser.

**▶ Play: [https://avinashkarhana.com/avinashkarhana/TestProjects/bingo/index.html](https://avinashkarhana.com/avinashkarhana/TestProjects/bingo/index.html)**

---

## 🎮 Game Modes

### 1. Pass and Play (Non-Network)
Play with 1–10 players on their own devices - no internet connection between players needed.

- **Each player sets up their own board** on their own device: tap cells to place numbers sequentially (tap a placed number to undo) or use 🎲 **Fill Random**.
- **Grid IDs (6 digits):** every board is stamped with a Grid ID bound to the device's User ID. Players exchange Grid IDs (verbally, chat, whatever) and enter them on the host device to include each board in the game. A Grid ID can be re-entered later to **restore the exact board** - Grid ID verification confirms it belongs to the right player.
- **Display names:** every player provides a display name alongside their Grid ID before the game begins, so the device always shows *who* called what.
- **Turn sequence (agreed before the game starts):**
  - Arrange the calling order manually with ↑ / ↓ per player, **or**
  - Hit 🎲 **Random toss** to shuffle the order randomly.
  - For 5 players, this fixes exactly whose turn it is before the first call - no mid-game arguments.
- **Turn enforcement during play:** a turn indicator shows the full agreed order (e.g. `1. Alex → 2. Sam → 3. Kim`) with the current caller highlighted. When it's another player's turn, the device asks for confirmation - *"It is Sam's turn to call out a number. Did Sam call 42?"* - before the call is recorded.
- **Pass the device:** the active player calls out a number, everyone marks it on their own board, then the turn advances automatically to the next player in the sequence.

> **Network mode (planned):** in peer-to-peer / WebRTC network play (same Wi-Fi or over the internet), display names, Grid IDs and the turn sequence will be auto-shared between peers - the same turn-order engine then applies without manual entry.

### 2. Play Against AI
A quick coin toss decides who calls first, then you and the AI take turns calling numbers. The AI board is hidden during play (revealable after the game / in replay).

### 3. AI Assist (any mode)
Toggle 🤖 **AI assist** and the app auto-calls numbers on your behalf, relaying each call to the group.

---

## ✨ Features

| Feature | Details |
|---|---|
| 📱 **PWA** | Installable, works offline via a local service worker (`bingo-pwa-local-sw.js` + `bingo-pwa-local.webmanifest`) |
| 🔢 **Flexible grids** | 3×3 up to 10×10, numbers 1…N |
| 🆔 **Grid IDs** | 6-digit IDs encode the board and are verified against the owner's User ID |
| 🔄 **Restore boards** | Paste a Grid ID to rebuild any player's exact board |
| 🔁 **Replay** | Step through every move (◀ Back / Next ▶), auto playback at 0.5×–5× speed, with per-move ownership |
| 📜 **Move log** | Every call is logged with the caller's name + Grid ID and a timestamp |
| 💾 **Game history** | Completed and in-progress games are saved on-device with grids, players, turn order and the full action log - resume ("Continue") any unfinished game |
| 🏁 **Win detection** | Rows, columns and diagonals are tracked per board, live BINGO status |
| 📋 **Results screen** | Scrollable list of all players - tap a player to toggle display name ↔ Grid ID. Each row shows that player's final state (lines completed / BINGO) when their board is known to the device (vs-AI today, network mode later); pass-and-play boards live on their own devices so their state shows as not on this device |
| 🎬 **Per-player playback** | When a board is known (vs-AI; any peer in the future network mode, where grids + call logs are shared at game end), the result row shows that player's final grid with completed BINGO lines highlighted, plus a one-tap playback of the shared move log focused on that board |
| 🎨 **Theming** | Light / dark appearance and per-game grid-size settings |
| 🔒 **Privacy** | No accounts, no tracking - all state stays in your browser's localStorage |

---

## 🚀 Run Locally

No build step required. Just serve the folder (a service worker needs `http(s)`, not `file://`):

```bash
cd TestProjects/bingo
python3 -m http.server 8080
# open http://localhost:8080
```

Or simply open `index.html` directly - everything except PWA installation/offline caching works from the file system too.

---

## 🕹️ How to Play

1. **New Game** → choose *Pass and play* or *Play against AI*, set player count and grid size, enter your display name.
2. **Set up your grid** - tap cells in order or fill randomly, then **Done Setup** to get your Grid ID.
3. **Confirm Grid IDs** - enter every player's display name and 6-digit Grid ID.
4. **Turn sequence** - arrange the calling order or 🎲 random-toss it.
5. **Play** - the current player calls a number out loud; everyone taps that number on their own board to mark it.
6. First player to complete the target lines shouts **BINGO** 🎉 - end the game, verify via Grid IDs, and watch the replay.

---

## 📁 Files

```
TestProjects/bingo/
├── index.html                  # the entire app (HTML + CSS + JS)
├── bingo-pwa-local-sw.js       # offline service worker
└── bingo-pwa-local.webmanifest # PWA manifest
```

---

## 🗺️ Roadmap

- **Network mode** - peer-to-peer / WebRTC auto-sharing of Grid IDs, display names and turn sequence (same Wi-Fi or internet)
- Configurable win conditions (lines to complete)
- More AI difficulty levels
