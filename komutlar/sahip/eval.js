const Discord = require("discord.js");
const db = require("quick.db")
exports.run = async(client, message, args) => {
    if (message.author.id !== "440575579335557121") return message.reply("Sen sahibim değilsin!")
	if(message.content === "client.token" || message.content === "token" || message.content === "client.login") return message.reply("Bir sen akıllısın değilmi ? tokenimi alamazsın.") 
    try {
        let codein = args.join(" ");
        let code = eval(codein);
        if(codein.includes("token")) return message.channel.send("Bir sen akıllısın değilmi .p")
        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .addField(':inbox_tray: Giriş:', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Çıkış', `\`\`\`js\n${code}\n\`\`\``)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        message.channel.send(embed)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'eval',
  description: 'Botun Davet Linkini Gösterir',
  usage: 'davet'
};