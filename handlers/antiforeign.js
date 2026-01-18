const config = require("../config");

async function antiForeignHandler(m, from, MrShefzy, isAdmins, isBotAdmin) {
  if (!config.antiforeign) return;
  if (!from.endsWith("@g.us")) return;
  if (!isBotAdmin) return;

  const sender = m.key.participant;
  if (!sender) return;

  const allowed = config.allowedCountryCode || "234";
  if (sender.startsWith(allowed)) return;
  if (isAdmins) return;

  await MrShefzy.groupParticipantsUpdate(from, [sender], "remove");
}

module.exports = antiForeignHandler;