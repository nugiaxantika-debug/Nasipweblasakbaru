const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf-8');

// Replace the previous m4a block with ogg/opus block
code = code.replace(
/const tmpFixedAudio = \`\/tmp\/yt_\$\{tmpId\}_fixed\.m4a\`;\s*fs\.writeFileSync\(tmpRaw, buffer\);\s*try \{\s*execSync\(\`ffmpeg -y -i \$\{tmpRaw\} -c:a aac -b:a 128k -map 0:a:0 -f mp4 \$\{tmpFixedAudio\}\`\);\s*const fixedBuffer = fs\.readFileSync\(tmpFixedAudio\);\s*await this\.sock\.sendMessage\(jid, \{ audio: fixedBuffer, mimetype: 'audio\/mp4', ptt: false \}, \{ quoted: msg \}\);\s*\} catch \(convErr\) \{/g,
`const tmpFixedAudio = \`/tmp/yt_\${tmpId}_fixed.ogg\`;
            fs.writeFileSync(tmpRaw, buffer);
            try {
              // Convert to OPUS for WhatsApp Voice Note compatibility
              execSync(\`ffmpeg -y -i \${tmpRaw} -c:a libopus -b:a 48k -vbr on -compression_level 10 -frame_duration 20 -application voip \${tmpFixedAudio}\`);
              const fixedBuffer = fs.readFileSync(tmpFixedAudio);
              // Send as voice note (ptt: true) with correct mimetype
              await this.sock.sendMessage(jid, { audio: fixedBuffer, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: msg });
            } catch (convErr) {`
);

fs.writeFileSync('src/services/whatsapp.ts', code);
