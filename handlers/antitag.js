const config = require("../config");
const { loadWarnings, saveWarnings } = require("./_warnUtils");

async function antiTagHandler(m, from, MrShefzy, isAdmins, isBotAdmin) {
  if (!config.antitag) return;
  if (!from.endsWith("@g.us")) return;
  if (!isBotAdmin) return;

  const mentions = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
  if (!mentions.length) return;
  if (isAdmins) return;

  const sender = m.key.participant;
  await MrShefzy.sendMessage(from, { delete: m.key });

  const mode = config.antitagMode || "warn";

  if (mode === "kick") {
    await MrShefzy.groupParticipantsUpdate(from, [sender], "remove");
    return;
  }

  if (mode === "warn") {
    const warnData = loadWarnings();
    warnData[sender] = (warnData[sender] || 0) + 1;
    saveWarnings(warnData);
  }
}

module.exports = antiTagHandler;