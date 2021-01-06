module.exports = {
    name: "news",
    description: "Get to know whats happening around",
    args: true,
    cooldown: 40,
    aliases: ['ns'],
    usage: "<national|international>",
    execute(message, args) {
        if(args[0] == "international"){
            message.channel.send("International news\n1) Blah blaah blah\n2)Blooh blooh bloh ;)")
        }else if(args[0] == "national"){
            message.channel.send("National News news\n1) Geeza Koka\n2)What happened? ;)")
        }
    }
}