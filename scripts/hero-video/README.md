# DNKV Hero Video Pipeline

This pipeline automatically generates high-definition, bandwidth-optimized cinematic looping hero videos for the Dr. Netaji Karale Vidyalaya (DNKV) website.

---

## 🌟 Quick Start

Run the complete pipeline and upload directly into Payload CMS:

```bash
# 1. Run the Ken Burns provider (zero AI required, uses your photos & FFmpeg)
npm run video:generate

# 2. Upload the generated videos and poster into Payload CMS
npm run video:upload
```

---

## 📸 1. Inputs

- **Source Photos Directory**: `/video/source-photos/`
  Place 4 to 6 real, landscape photos (1920x1080 or higher) of DNKV:
  - `arrival.jpg`: School front entrance at sunrise
  - `corridor.jpg`: Sunlit academic corridor
  - `classroom.jpg`: Students engaged in classroom learning (viewed respectfully from behind)
  - `hands.jpg`: Close-up of writing / notebook
  - `sports.jpg`: Wide playground or athletic field
  - `closing.jpg`: Campus panorama at golden hour

- **Shot Definitions**: `/video/shots.json`
  Configures duration, cinematic zoompan parameters, and prompts for each shot.

---

## 🎬 2. Available Providers

You can choose between 3 providers using the `--provider` flag:

### Option A: KenBurnsProvider (Default / Recommended)

Requires no third-party APIs. Takes your photos and applies gentle camera zoom, glide, and pans using FFmpeg.

```bash
npx tsx scripts/hero-video/pipeline.ts --provider=kenburns
```

### Option B: ManualProvider (Web AI Video Tools)

If you generate clips using web video tools (Runway Gen-3, Luma Dream Machine, Kling, Pika):

1. Download 3.5s MP4 clips.
2. Place them into `/video/clips/` named by shot id:
   - `arrival.mp4`
   - `corridor.mp4`
   - `classroom.mp4`
   - `hands.mp4`
   - `sports.mp4`
   - `closing.mp4`
3. Run:

```bash
npx tsx scripts/hero-video/pipeline.ts --provider=manual
```

### Option C: HttpProvider (Direct API)

Calls an image-to-video API using `VIDEO_API_URL` and `VIDEO_API_KEY` from your `.env` file:

```bash
npx tsx scripts/hero-video/pipeline.ts --provider=http
```

---

## 📦 3. Generated Deliverables

The pipeline outputs:

- `video/output/hero-1080.mp4` (Desktop 1080p, CRF 28, max 6 MB)
- `video/output/hero-1080.webm` (VP9 optimized video)
- `video/output/hero-720.mp4` (Mobile 720p, CRF 30, max 3 MB)
- `video/output/hero-poster.jpg` (Instant-load poster image)

All files are automatically copied to `backend/public/media/` and `frontend/public/media/`.

---

## 🖥️ 4. No-Code Video Replacement via Admin Panel

**School staff do NOT need to run any scripts to replace the hero video!**

School staff can replace the video at any time from the browser:

1. Log in to `/admin` at `http://localhost:3000/admin` (or `http://localhost:3001/admin`).
2. Go to **Globals > Homepage**.
3. Scroll to **2. Hero Video & Banner Section**.
4. Click **Replace** or upload a new file for:
   - _Hero Video - Desktop_
   - _Hero Video - Mobile_
   - _Hero Poster Image_
5. Click **Save Changes**. The live website updates automatically within seconds!
