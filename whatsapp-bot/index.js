const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const pino = require('pino');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

async function connectToWhatsApp() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`Using WhatsApp v${version.join('.')}, isLatest: ${isLatest} bro yrr ✨`);

    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const sock = makeWASocket({
        version,
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ['GemiBoy Bot', 'Chrome', '1.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            console.log('Safal bro yrr, yo QR scan gara hai:');
            qrcode.generate(qr, { small: true });
        }
        if (connection === 'close') {
            const statusCode = (lastDisconnect.error instanceof Boom) ? 
                lastDisconnect.error.output.statusCode : 0;
            const reason = (lastDisconnect.error instanceof Boom) ? 
                lastDisconnect.error.message : 'Unknown reason';
            
            console.log(`Connection closed yrr broo! Status: ${statusCode}, Reason: ${reason}`);

            if (statusCode === 405 || statusCode === DisconnectReason.loggedOut) {
                console.log('Auth data corrupted or logged out bhayechha bro yrr, cleaning up...');
                if (fs.existsSync('auth_info_baileys')) {
                    fs.rmSync('auth_info_baileys', { recursive: true, force: true });
                    console.log('auth_info_baileys folder deleted yrr broo! ✨');
                }
                setTimeout(() => connectToWhatsApp(), 3000);
            } else {
                console.log('Reconnect gardai chhu hai bro yrr...');
                setTimeout(() => connectToWhatsApp(), 5000);
            }
        } else if (connection === 'open') {
            console.log('WhatsApp connected bhayo Safal bro yrr! ✨❤️');
        }
    });

    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0];
        if (!msg.message) return;

        const messageType = Object.keys(msg.message)[0];
        const content = messageType === 'conversation' ? msg.message.conversation : 
                        messageType === 'extendedTextMessage' ? msg.message.extendedTextMessage.text : '';

        if (!content) return;

        console.log(`Naya message aayo bro yrr: ${content}`);

        const cleanContent = content.toLowerCase().trim();

        if (cleanContent === 'ping') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'Pong! Safal bro yrr, ma active chhu hai! ✨❤️' });
        } else if (cleanContent === 'gemini') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'Sahi ho Safal bro yrr! Brain boot up gardai chhu hai! ✨❤️' });
            
            const rootPath = path.join(__dirname, '..');
            exec(`start cmd /k "start.bat"`, { cwd: rootPath }, (error) => {
                if (error) {
                    console.error(`Error running start.bat yrr broo: ${error}`);
                }
            });
        }
    });
}

console.log('Bot start hudai chha bro yrr...');
connectToWhatsApp();
