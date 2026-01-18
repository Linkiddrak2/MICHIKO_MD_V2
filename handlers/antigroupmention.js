const config = require("../config");

async function antiGroupMentionHandler(m, from, MrShefzy, isAdmins, isBotAdmin) {
  if (!config.antigroupmention) return;
  if (!from.endsWith("@g.us")) return;
  if (!isBotAdmin) return;

  const mentioned =
    m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

  if (mentioned.length < 5) return;
  if (isAdmins) return;

  const sender = m.key.participant;
  await MrShefzy.sendMessage(from, { delete: m.key });

  if (config.antigroupmentionMode === "kick") {
    await MrShefzy.groupParticipantsUpdate(from, [sender], "remove");
  }
}

module.exports = antiGroupMentionHandler;