const {
	Client,
	Intents
} = require("discord.js");
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const dbController = require("./controllers/dbController");
const APIController = require("./controllers/apiController");
const api = new APIController(
	process.env.SERVICE_ID,
	process.env.TOKEN_ADDRESS
);
const db = new dbController();

const SYMBOL = process.env.SYMBOL;

var messageCounter = {};

client.once("ready", async () => {
	console.log("Bot ready");
	await api.issueAccessToken();
});

client.on("messageCreate", async (message) => {
	const userId = message.author.id;
	if (/^!/.test(message.content)) {
		const args = message.content.split(" ");
		const cmd = args[0].substring(1);
		const res = await db.getUserByAccount(userId);
		switch (cmd) {
			case "ping":
				message.channel.send("pong");
				break;
			case "register":
				if (res.length === 0) {
					const address = await api.createWallet();
					console.log("Wallet Created:" + address);
					db.createUser(userId, address);
					message.channel.send(`Wallet created!\nYour wallet is ${address}`);
				} else {
					message.channel.send("You already have a wallet!");
				}
				break;
			case "address":
				if (res.length === 0) {
					message.channel.send(
						`Your wallet is not registered!\nUse !register to create one.`
					);
				} else {
					message.channel.send(`Your wallet is ${res[0].address}`);
				}
				break;
			case "balance":
				if (res.length === 0) {
					message.channel.send(
						`Your wallet is not registered!\nUse !register to create one.`
					);
					return;
				}
				const balance = await api.getBalance(res[0].address);
				message.channel.send(`You have ${balance} ${SYMBOL}!`);

				break;
			case "send":
				if (args.length < 3) {
					message.channel.send("Usage: send @to amount");
					return;
				}
				const toId = args[1].replace("<@!", "").replace(">", "");
				const toAddres = await db.getUserByAccount(toId);
				if (toAddres.length === 0) {
					message.channel.send("Recipetant doesn't have a wallet!");
					return;
				}
				const sendAmount = Number(args[2]);
				api.sendToken(toAddres, sendAmount);
				message.channel.send(`Transfered ${sendAmount} ${SYMBOL}! from <@!${userId}> to <@!${toId}>`);
				break;
			case "help":
				const usage = "Usage:" +
					"\n!register - Create a wallet" +
					"\n!address - Get your wallet address" +
					"\n!balance - Get your balance" +
					`\n!send @to amount - Send ${SYMBOL} to @to` +
					"\n!ping - Ping the bot" +
					"\n!help - Show this message";
				message.channel.send(usage);
				break;
		}
	} else {
		messageCounter[userId] = messageCounter[userId] != undefined ? messageCounter[userId] + message.content.length : message.content.length;
		if (messageCounter[userId] > 10) {
			const res = await db.getUserByAccount(userId);
			if (res != 0) {
				// 10文字以上を超えるごとにトークンを送る
				const value = Math.floor(messageCounter[userId] * 0.2);
				await api.issueToken(res[0].address, value);
				messageCounter[userId] = 0;
			}
		}
	};
});

client.login(process.env.DISCORD_TOKEN);