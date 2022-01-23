import { Client, Intents, MessageEmbed } from "discord.js";
import dotenv from "dotenv"
import calculator from "./calculator.mjs"
const CalculPostfixExpression = calculator.CalculPostfixExpression;
const ShuntingYardAlgorithm = calculator.ShuntingYardAlgorithm;

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.login(process.env.CLIENT_TOKEN);

client.on("ready", () => {
    console.log("coder-BOT is online!");
});

client.on("messageCreate", async (message) => {
    if(message.content.startsWith("!= ")) {
        
        const eqt = message.content.split("!= ").pop();
        const result = CalculPostfixExpression( ShuntingYardAlgorithm( eqt ).invert() ).toString();
        console.log();
        const embedMessage = new MessageEmbed()
            .setColor("#6e75d7")
            .setAuthor( { name: message.author.username , iconURL: message.author.avatarURL() } )
            .addField("Input", eqt)
            .addField("Result", result)
            
        message.channel.send( { embeds: [embedMessage] } );
    }
})
