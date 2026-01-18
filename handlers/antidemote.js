module.exports = async (update, MrShefzy) => {
  const { id, participants, action } = update;
  if (action !== "demote") return;

  const cfg = global.settings?.antidemote?.[id];
  if (!cfg?.enabled) return;

  for (const user of participants) {
    await MrShefzy.groupParticipantsUpdate(id, [user], "promote");
  }
};