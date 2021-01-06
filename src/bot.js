require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const {prefix} = require('./config.json');
const { cooldown } = require('../commands/ping');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("commands").filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    client.commands.set(command.name, command)
}

const cooldowns = new Discord.Collection()

client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot){
        return;
    }
    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLocaleLowerCase();

    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(!command) return;
    
    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection())
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if(timestamps.has(message.author.id)){
        expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if(now < expirationTime){
            const timeLeft = (expirationTime - now) / 1000;
            message.reply(`Please wait ${timeLeft.toFixed(1)} second(s) before reusing the \`${command.name}\` command.`).then((msg) => {
                msg.delete({timeout: timeLeft*1000})
            });
            return;
        }
    }else{
        timestamps.set(message.author.id, now);
        setTimeout(() => {
            if(timestamps.has(message.author.id)){
                timestamps.delete(message.author.id)
            }
        }, cooldownAmount)
    }

    if(command.args && !args.length){
        let reply = `Oops! You didn't provide any arguments, ${message.author}`;
        if(command.usage){
            reply += `\n The proper usage would be:\n \`\`\`${prefix}${command.name} ${command.usage}\`\`\``
        }
        return message.channel.send(reply);
    }
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
    
})

client.login(process.env.DISCORD_BOT_TOKEN);