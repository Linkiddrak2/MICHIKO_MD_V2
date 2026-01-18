module.exports = async (update, MrShefzy) => {
  const { id, participants, action } = update;
  if (action !== "promote") return;

  const cfg = global.settings?.antipromote?.[id];
  if (!cfg?.enabled) return;

  for (const user of participants) {
    await MrShefzy.groupParticipantsUpdate(id, [user], "demote");
  }
};