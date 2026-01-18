// Base by : Mr Shefzy
//ᴄᴏɴᴛᴀᴄᴛ :- 2348082369566
//ᴛᴇʟᴇɢʀᴀᴍ :- t.me//shefzytech
// ᴀʟʟ ʜᴀɪʟ ʟᴏʀᴅ sʜᴇғᴢʏ
//ᴡᴀɴɴᴀ ᴄʟᴏɴᴇ ᴍʏ sʜɪɪɪɪɪ??? 
//ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ ɢɪᴠᴇ ᴍᴇ ᴄʀᴇᴅɪᴛs

const fs = require("fs-extra");
const chalk = require("chalk");

module.exports = {

  // ==================================================
  // 🤖 BOT IDENTITY
  // ==================================================
  botName: "ᴍɪᴄʜɪᴋᴏ ²⁰²⁶",
  ownerName: "Mr Shefzy",
  version: "2",
  hosting: "Shefzy Private Cloud",

  // ==================================================
  // 👑 OWNER & ACCESS CONTROL
  // ==================================================
  ownerNumbers: [
    "2347079360035"
  ],

  sudo: [
    "2349028711461"
  ],

  // ==================================================
  // ⚙️ GLOBAL BOT BEHAVIOUR
  // ==================================================
  STATUS_VIEW: true,
  AUTO_JOIN_GROUP: true,

  auto: {
    react: false,
    online: false,
  },

  prefix: ["."],

  // ==================================================
  // 🖼️ MENU & BRANDING
  // ==================================================
  menuImages: [
    "https://files.catbox.moe/8os7xt.jpg",
    "https://files.catbox.moe/6yxbgv.jpg",
    "https://files.catbox.moe/4jv9tc.jpg",
    "https://files.catbox.moe/8hkvs4.png",
    "https://files.catbox.moe/zsd5bx.jpg",
    "https://files.catbox.moe/iz2a3b.jpg",
  ],

  packname: "𝑴𝒓 𝑺𝒉𝒆𝒇𝒛𝒚",
  author: "𝕮𝖗𝖊𝖆𝖙𝖊𝖉 𝖇𝖞 𝕸𝖗 𝕾𝖍𝖊𝖋𝖟𝖞",

  // ==================================================
  // 🛡️ GROUP PROTECTION SYSTEMS
  // ==================================================

  // -------- ANTI-LINK --------
  antilink: false,
  antilinkMode: "warn", // warn | kick | delete
  maxWarnings: 3,

  // -------- ANTI-BOT --------
  antibot: false,
  antibotMode: "kick", // kick | delete

  // -------- ANTI-PROMOTE --------
  antipromote: false, // blocks unauthorized promotions

  // -------- ANTI-DEMODE --------
  antidemote: false, // blocks unauthorized demotions

  // -------- ANTI-FOREIGN --------
  antiforeign: false,
  allowedCountryCode: "234", // Nigeria

  // -------- ANTI-BADWORD --------
  antibadword: false,
  badwords: [
    "fuck",
    "bitch",
    "shit",
    "asshole"
  ],

  // -------- ANTI-TAG --------
  antitag: false,
  antitagMode: "warn", // warn | kick | delete

  // -------- ANTI-TAG ADMIN --------
  antitagadmin: false,
  antitagadminMode: "delete", // delete | kick | warn

  // -------- ANTI-GROUP MENTION --------
  antigroupmention: false,
  antigroupmentionMode: "warn", // warn | kick | delete

  // ==================================================
  // 💬 DEFAULT BOT MESSAGES
  // ==================================================
  mess: {
    wait: "⏳ Please wait, processing your request...",
    success: "✅ Success!",
    error: {
      api: "❌ An API error occurred. Please try again later.",
      owner: "👑 Bot owner only!",
      group: "👥 Groups only!",
      admin: "🛡️ Group admins only!",
      botAdmin: "🤖 I need admin privilege!"
    }
  },

  // ==================================================
  // 🧠 API KEYS
  // ==================================================
  openai_key: "YOUR_OPENAI_API_KEY"
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.greenBright(`\n[UPDATE] '${__filename}' has been updated. Reloading...\n`));
    delete require.cache[file];
    require(file);
});
