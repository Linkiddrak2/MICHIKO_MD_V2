// Base by : Mr Shefzy
//ᴄᴏɴᴛᴀᴄᴛ :- 2349028711461
//ᴛᴇʟᴇɢʀᴀᴍ :- t.me//mr_shefzy
// ᴀʟʟ ʜᴀɪʟ ʟᴏʀᴅ sʜᴇғᴢʏ
//ᴡᴀɴɴᴀ ᴄʟᴏɴᴇ ᴍʏ sʜɪɪɪɪɪ??? 
//ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ ɢɪᴠᴇ ᴍᴇ ᴄʀᴇᴅɪᴛs

const config = require("../config");
const { loadWarnings, saveWarnings } = require("./_warnUtils");

async function antiBotHandler(m, from, MrShefzy, isAdmins, isBotAdmin) {
  if (!config.antibot) return;
  if (!from.endsWith("@g.us")) return;
  if (!isBotAdmin) return;
  if (m.key.fromMe) return;

  const sender = m.key.participant || m.key.remoteJid;

  // Bots usually have this pattern
  if (!sender.includes("bot")) return;
  if (isAdmins) return;

  await MrShefzy.sendMessage(from, { delete: m.key });

  const mode = config.antibotMode || "kick";

  if (mode === "kick") {
    await MrShefzy.groupParticipantsUpdate(from, [sender], "remove");
  }
}

module.exports = antiBotHandler;