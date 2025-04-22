#!/usr/bin/env node
// scripts/finalizeVideo.js

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

function findFilesRecursively(dir, ext) {
  let results = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(findFilesRecursively(full, ext));
    } else if (stat.isFile() && full.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

(async () => {
  const platform = process.argv[2]; // "ios" or "android"
  if (!platform) {
    console.error('❌  Usage: node scripts/finalizeVideo.js <ios|android>');
    process.exit(1);
  }

  const root = path.resolve(__dirname, '..', 'files', platform);
  if (!fs.existsSync(root)) {
    console.error(`❌  Directory not found: ${root}`);
    process.exit(1);
  }

  // 1) Gather and merge all mp4 clips
  const videos = findFilesRecursively(root, '.mp4');
  if (!videos.length) {
    console.warn(`⚠️  No .mp4 clips found under files/${platform}/`);
    process.exit(0);
  }

  const listFile = path.join(root, 'ffmpeg_list.txt');
  fs.writeFileSync(
    listFile,
    videos
      .sort()
      .map(v => `file '${v.replace(/'/g, "'\\''")}'`)
      .join('\n'),
  );

  const mergedMp4 = path.join(root, `${platform}.mp4`);
  console.log(`🎬 Merging ${videos.length} clips into ${platform}.mp4…`);
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${listFile}" -c copy "${mergedMp4}"`,
    {stdio: 'inherit'},
  );
  fs.unlinkSync(listFile);

  // 2) Convert merged MP4 → GIF (adjust fps/scale as you like)
  const gifPath = path.join(root, `${platform}.gif`);
  console.log(`🔄 Converting ${platform}.mp4 → ${platform}.gif…`);
  execSync(
    `ffmpeg -y -i "${mergedMp4}" -vf "fps=10,scale=480:-1:flags=lanczos" "${gifPath}"`,
    {stdio: 'inherit'},
  );

  // 3) Cleanup: remove all original clips + merged MP4
  console.log('🧹 Cleaning up intermediate files…');
  videos.forEach(v => fs.unlinkSync(v));
  fs.unlinkSync(mergedMp4);

  // Remove any sub‑directories (those “✓ …” folders)
  fs.readdirSync(root).forEach(entry => {
    const full = path.join(root, entry);
    if (fs.statSync(full).isDirectory()) {
      fs.rmSync(full, {recursive: true, force: true});
    }
  });

  console.log(`✅ Done! GIF available at files/${platform}/${platform}.gif`);
})();
