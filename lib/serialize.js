const { proto, getContentType, downloadMediaMessage } = require("@whiskeysockets/baileys");
const pino = require('pino');

/**
 * @param {import('@whiskeysockets/baileys').WASocket} MrShefzy The Baileys client object.
 * @param {import('@whiskeysockets/baileys').proto.IWebMessageInfo} m The raw message object.
 * @returns {Promise<import('@whiskeysockets/baileys').proto.IWebMessageInfo>}
 */
const smsg = async (MrShefzy, m) => {
    if (!m) return m;

    // --- Key Information ---
    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
        m.from = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.from.endsWith('@g.us');
        m.sender = MrShefzy.decodeJid(m.fromMe && MrShefzy.user.id || m.participant || m.key.participant || m.from || '');
    }

    // --- Message Content & Type ---
    if (m.message) {
        m.mtype = getContentType(m.message);
        m.msg = (m.mtype === 'viewOnceMessageV2') ? m.message.viewOnceMessageV2.message[getContentType(m.message.viewOnceMessageV2.message)] : m.message[m.mtype];
        
        m.body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.msg.caption :
            m.mtype === "videoMessage" ? m.msg.caption :
            m.mtype === "extendedTextMessage" ? m.msg.text :
            m.mtype === "buttonsResponseMessage" ? m.msg.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.msg.singleSelectReply?.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            // Safely handle interactive responses
            (m.mtype === "interactiveResponseMessage" && m.msg?.nativeFlowResponseMessage) ? (()=>{ try { return JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id } catch { return "" }})() :
            ""
        );

        // ---  QUOTED MESSAGE HANDLER ---
        let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage || null;
        if (m.quoted) {
            let type = getContentType(quoted);
            m.quoted = m.quoted[type];
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted };
            m.quoted.mtype = type;
            m.quoted.id = m.msg.contextInfo.stanzaId;
            m.quoted.sender = MrShefzy.decodeJid(m.msg.contextInfo.participant);
            m.quoted.fromMe = m.quoted.sender === MrShefzy.decodeJid(MrShefzy.user.id);
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || '';
            
            m.quoted.download = async () => await downloadMediaMessage(
                { key: { remoteJid: m.from, id: m.quoted.id, fromMe: m.quoted.fromMe, participant: m.quoted.sender }, message: { [m.quoted.mtype]: m.quoted } },
                'buffer', {}, { logger: pino({ level: 'silent' }) }
            );
        }
    }
    
    // --- Direct Media Download ---
    m.download = async () => await downloadMediaMessage(m, 'buffer', {}, { logger: pino({ level: 'silent' }) });
    
    return m;
};

module.exports = { smsg };