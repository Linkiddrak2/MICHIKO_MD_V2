// Base by : Mr Shefzy
//ᴄᴏɴᴛᴀᴄᴛ :- 2349028711461
//ᴛᴇʟᴇɢʀᴀᴍ :- t.me//mr_shefzy
// ᴀʟʟ ʜᴀɪʟ ʟᴏʀᴅ sʜᴇғᴢʏ
//ᴡᴀɴɴᴀ ᴄʟᴏɴᴇ ᴍʏ sʜɪɪɪɪɪ??? 
//ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ ɢɪᴠᴇ ᴍᴇ ᴄʀᴇᴅɪᴛs

const config = require("../config");
const { loadWarnings, saveWarnings } = require("./_warnUtils");

async function antiBadwordHandler(m, from, MrShefzy, isAdmins, isBotAdmin) {
  if (!config.antibadword) return;
  if (!from.endsWith("@g.us")) return;
  if (!isBotAdmin) return;

  const text =
    m.message?.conversation ||
    m.message?.extendedTextMessage?.text ||
    "";

  const sender = m.key.participant;
  if (isAdmins) return;

  const badwords = config.badwords || [];
  const found = badwords.find(w => text.toLowerCase().includes(w));
  if (!found) return;

  await MrShefzy.sendMessage(from, { delete: m.key });

  const warnData = loadWarnings();
  warnData[sender] = (warnData[sender] || 0) + 1;

  if (warnData[sender] >= config.maxWarnings) {
    delete warnData[sender];
    saveWarnings(warnData);
    await MrShefzy.groupParticipantsUpdate(from, [sender], "remove");
    return;
  }

  saveWarnings(warnData);

  await MrShefzy.sendMessage(from, {
    text: `⚠️ @${sender.split("@")[0]} bad word detected (${warnData[sender]}/${config.maxWarnings})`,
    mentions: [sender]
  });
}

module.exports = antiBadwordHandler;