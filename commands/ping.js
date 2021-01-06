const Discord = require('discord.js');

module.exports = {
    name: "ping",
    description: "Ping! Pong!",
    args: false,
    cooldown: 5,
    aliases: ["pong"],
    usage: "[ip]",
    execute(message, args) {
        message.channel.send("Pinging...").then((msg) =>{
            var latency = msg.createdTimestamp - message.createdTimestamp;
            var color = "#0099ff";
            if(latency > 500){
                color = "#d4220f";
            }else if(latency > 100){
                color = "#ffd363";
            }else if(latency >= 0){
                color = "#68ff42";
            }

            const exampleEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('Ping Pong')
            .addFields(
                { name: 'Latency: ', value: `${latency}ms`, inline: false }
            )
            .setTimestamp()

            msg.channel.send(exampleEmbed);
        });
    }
}