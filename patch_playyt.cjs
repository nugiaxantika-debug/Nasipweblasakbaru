const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf-8');

code = code.replace(
/const tmpFixedMp3 = \`\/tmp\/yt_\$\{tmpId\}_fixed\.mp3\`;\s*fs\.writeFileSync\(tmpRaw, buffer\);\s*try \{\s*execSync\(\`ffmpeg -y -i \$\{tmpRaw\} -c:a libmp3lame -b:a 128k -map 0:a:0 -f mp3 \$\{tmpFixedMp3\}\`\);\s*const fixedBuffer = fs\.readFileSync\(tmpFixedMp3\);\s*await this\.sock\.sendMessage\(jid, \{ audio: fixedBuffer, mimetype: 'audio\/mpeg', ptt: false \}, \{ quoted: msg \}\);\s*\} catch \(convErr\) \{/g,
`const tmpFixedAudio = \`/tmp/yt_\${tmpId}_fixed.mp3\`;
            fs.writeFileSync(tmpRaw, buffer);
            try {
              execSync(\`ffmpeg -y -i \${tmpRaw} -c:a libmp3lame -b:a 128k -map 0:a:0 -f mp3 \${tmpFixedAudio}\`);
              const fixedBuffer = fs.readFileSync(tmpFixedAudio);
              // Send as voice note (ptt: true) so it plays perfectly as WA audio
              await this.sock.sendMessage(jid, { audio: fixedBuffer, mimetype: 'audio/mp4', ptt: true }, { quoted: msg });
            } catch (convErr) {`
);

code = code.replace(
/if \(fs\.existsSync\(tmpFixedMp3\)\) fs\.unlinkSync\(tmpFixedMp3\);/g,
"if (fs.existsSync(tmpFixedAudio)) fs.unlinkSync(tmpFixedAudio);"
);

fs.writeFileSync('src/services/whatsapp.ts', code);
