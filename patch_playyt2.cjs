const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf-8');

code = code.replace(
/const tmpFixedAudio = \`\/tmp\/yt_\$\{tmpId\}_fixed\.mp3\`;\s*fs\.writeFileSync\(tmpRaw, buffer\);\s*try \{\s*execSync\(\`ffmpeg -y -i \$\{tmpRaw\} -c:a libmp3lame -b:a 128k -map 0:a:0 -f mp3 \$\{tmpFixedAudio\}\`\);\s*const fixedBuffer = fs\.readFileSync\(tmpFixedAudio\);\s*\/\/ Send as voice note \(ptt: true\) so it plays perfectly as WA audio\s*await this\.sock\.sendMessage\(jid, \{ audio: fixedBuffer, mimetype: 'audio\/mp4', ptt: true \}, \{ quoted: msg \}\);\s*\} catch \(convErr\) \{/g,
`const tmpFixedAudio = \`/tmp/yt_\${tmpId}_fixed.m4a\`;
            fs.writeFileSync(tmpRaw, buffer);
            try {
              execSync(\`ffmpeg -y -i \${tmpRaw} -c:a aac -b:a 128k -map 0:a:0 -f mp4 \${tmpFixedAudio}\`);
              const fixedBuffer = fs.readFileSync(tmpFixedAudio);
              await this.sock.sendMessage(jid, { audio: fixedBuffer, mimetype: 'audio/mp4', ptt: false }, { quoted: msg });
            } catch (convErr) {`
);

fs.writeFileSync('src/services/whatsapp.ts', code);
