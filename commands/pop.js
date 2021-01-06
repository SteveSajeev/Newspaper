module.exports = {
    name: "pop",
    description: "Pops balloon",
    execute(message, args) {
        message.channel.send("Just popped your balloon! |BOOM|");
    }
}