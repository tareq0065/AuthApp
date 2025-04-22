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

  // 1) Find & merge all mp4 clips
  const videos = findFilesRecursively(root, '.mp4');
  if (videos.length) {
    const listFile = path.join(root, 'ffmpeg_list.txt');
    fs.writeFileSync(
      listFile,
      videos
        .sort()
        .map(v => `file '${v.replace(/'/g, "'\\''")}'`)
        .join('\n'),
    );

    const merged = path.join(root, `${platform}.mp4`);
    console.log(`🎬 Merging ${videos.length} clips into ${platform}.mp4…`);
    execSync(
      `ffmpeg -y -f concat -safe 0 -i "${listFile}" -c copy "${merged}"`,
      {stdio: 'inherit'},
    );
    fs.unlinkSync(listFile);
  } else {
    console.warn(`⚠️  No .mp4 clips found under files/${platform}/`);
  }

  // 2) Collect all .png screenshots and move them up
  const pngs = findFilesRecursively(root, '.png');
  for (const src of pngs) {
    const dest = path.join(root, path.basename(src));
    // overwrite if same name
    fs.renameSync(src, dest);
  }

  // 3) Remove every subfolder (including “✓ …” ones)
  for (const entry of fs.readdirSync(root)) {
    const full = path.join(root, entry);
    if (fs.statSync(full).isDirectory()) {
      fs.rmSync(full, {recursive: true, force: true});
    }
  }

  console.log(
    `✅ Done! files/${platform} now contains:\n  • ${platform}.mp4\n  • ${pngs.length} screenshot(s)`,
  );
})();
