const Discord = require("discord.js")
const Intents = require("discord.js")
const client = new Discord.Client({ disableMentions: "everyone", ws: { intents: Intents.ALL } });
const db = require("quick.db")
const fs = require("fs")
const fetch = require("node-fetch");

client.ayarlar = {
  "token": "Nzg1OTc0ODEyNzY1MzIzMjk1.X8_qFg.3Di4uro1wn4lpaA2OEnLFdTwu9I",
  "sahip": ["759095243080597565", "440575579335557121"],
  "prefix": "!",
  "renk": "BLUE",
  "botİsim": "Uptime",
  "embedRenk": "BLUE",
  "embedFooter": "Copyright © WhYBoLu Development 2020",
  "version": "2.5",
  "destek": "https://discord.gg/paypal",
  "website": "https://google.com/"
}
  
client.on("ready", () => {
  console.log("Aktif")
  client.user.setActivity(`Uptime Bot | By TheClawNz#6717`)
})
 
client.on("warn", warn => {
  console.log(`Bir Uyarı Belirdi: ${warn}`)
})

client.on("error", error => {
  console.log(`Bir Hata Çıktı: ${error}`)
})

/* komut yükleme başlangıç */
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdirSync('./komutlar').forEach(dir => {
  fs.readdir(`./komutlar/${dir}/`, (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
      let props = require(`./komutlar/${dir}/${f}`);
      console.log(`Yüklenen komut: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
})

client.on("message", async message => {
        if(message.author.bot) return;
        if(!message.guild) return;
        if(message.channel.type === "dm") return;
        let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix
        if (!message.content.startsWith(prefix)) return;
        let command = message.content.split(' ')[0].slice(prefix.length);
        let params = message.content.split(' ').slice(1);
        let cmd;
        if (client.commands.has(command)) {
          cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
          cmd = client.commands.get(client.aliases.get(command));
        }
        if (cmd) {
          cmd.run(client, message, params, prefix);
        }
})
 
client.on("guildCreate", guild => {
  console.log(`[Sunucuya Eklendim]: ${guild.name} (${guild.id}) Adlı sunucuya eklendim`)
});

client.on("guildDelete", guild => {
  console.log(`[Sunucudan Ayrılma]: ${guild.name} (${guild.id}) Adlı sunucudan atıldım`)
});  


setInterval(() => {
  const linkler = db.fetch('uptimelink');
  if(linkler) {
  if(linkler.length > 0) {
  linkler.forEach(s => {
  fetch(s.site).catch(err => {
  console.log('');
  console.log(`${s.site} hata verdi. Sahibi: ${s.sahipTag}`);
  console.log('');
  })
  console.log(`${s.site} uptime edildi. Sahibi: ${s.sahipTag}`);
  })
  }
 }
}, 60000)


client.login(client.ayarlar.token)