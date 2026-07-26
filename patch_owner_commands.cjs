const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// 1. Remove debug text
const debugRegex = /👑 \*Akses Ditolak\*\\nPerintah ini hanya bisa digunakan oleh Owner!\\n\\n\(Info Debug: ID Anda adalah \$\{senderJid\}\)/;
if (code.match(debugRegex)) {
    code = code.replace(debugRegex, '👑 *Akses Ditolak*\\nPerintah ini hanya bisa digunakan oleh Owner!');
    console.log('Removed debug text from Akses Ditolak');
}

// 2. Add ownermenu back to ownerCommands
const ownerCmdsRegex = /const ownerCommands = \['\.antibot', 'antibot'/;
if (code.match(ownerCmdsRegex)) {
    code = code.replace(ownerCmdsRegex, "const ownerCommands = ['.ownermenu', 'ownermenu', '.antibot', 'antibot'");
    console.log('Added ownermenu back to ownerCommands');
}

fs.writeFileSync('src/services/whatsapp.ts', code);
