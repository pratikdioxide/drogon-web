const BASE = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

export async function getUserPhoto(telegramId: number): Promise<string | null> {
  try {
    const r1 = await fetch(`${BASE}/getUserProfilePhotos?user_id=${telegramId}&limit=1`)
    const d1 = await r1.json()
    if (!d1.ok || !d1.result.photos.length) return null
    const fileId = d1.result.photos[0][0].file_id

    const r2 = await fetch(`${BASE}/getFile?file_id=${fileId}`)
    const d2 = await r2.json()
    if (!d2.ok) return null

    return `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${d2.result.file_path}`
  } catch {
    return null
  }
}

export async function sendMessage(chatId: number, text: string): Promise<boolean> {
  try {
    const r = await fetch(`${BASE}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
    const d = await r.json()
    return d.ok
  } catch {
    return false
  }
}

export async function broadcastMessage(
  ids: number[],
  text: string,
  onProgress?: (done: number, total: number) => void
): Promise<{ sent: number; failed: number }> {
  let sent = 0, failed = 0
  for (let i = 0; i < ids.length; i++) {
    const ok = await sendMessage(ids[i], text)
    ok ? sent++ : failed++
    onProgress?.(i + 1, ids.length)
    // Telegram rate limit: 30 msg/sec — keep safe at ~20/sec
    if (i % 20 === 19) await new Promise(r => setTimeout(r, 1000))
  }
  return { sent, failed }
}