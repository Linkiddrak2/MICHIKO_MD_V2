const config = require("../config");

async function antiTagAdminHandler(m, from, MrShefzy, isAdmins, isBotAdmin) {
  if (!config.antitagadmin) return;
  if (!from.endsWith("@g.us")) return;
  if (!isBotAdmin) return;

  const mentions = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
  if (!mentions.length) return;

  const adminMentioned = mentions.some(j => isAdmins.includes(j));
  if (!adminMentioned) return;

  await MrShefzy.sendMessage(from, { delete: m.key });
}

module.exports = antiTagAdminHandler;