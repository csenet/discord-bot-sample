const request = require("request-promise");
const axios = require("axios");

class APIController {
	constructor(serviceId, tokenAddress) {
		this.serviceId = serviceId;
		this.tokenAddress = tokenAddress;
	}

	async getAccessToken() {
		const params = {
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			audience: "https://api.seknot.net",
			grant_type: "client_credentials",
		};
		const options = {
			method: "POST",
			url: "https://dev-xe71ik8z.us.auth0.com/oauth/token",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(params),
		};
		const output = JSON.parse(await request(options));
		return output.access_token;
	}

	async issueAccessToken() {
		this.accessToken = await this.getAccessToken();
	}

	async createWallet() {
		const options = {
			method: "POST",
			url: "https://api.seknot.net/wallet",
			headers: {
				authorization: "Bearer " + this.accessToken,
				"content-type": "application/json",
			},
			data: JSON.stringify({
				serviceId: this.serviceId,
			}),
		};
		return (await axios(options)).data.address;
	}

	async getBalance(address) {
		const options = {
			method: "GET",
			url: `https://api.seknot.net/token/${this.tokenAddress}/${address}/balance`,
			headers: {
				authorization: "Bearer " + this.accessToken,
				"content-type": "application/json",
			},
			data: JSON.stringify({
				serviceId: this.serviceId,
			}),
		};
		return (await axios(options)).data;
	}

	async issueToken(address, value) {
		const options = {
			method: "POST",
			url: `https://api.seknot.net/token/${this.tokenAddress}/mint`,
			headers: {
				authorization: "Bearer " + this.accessToken,
				"content-type": "application/json",
			},
			data: JSON.stringify({
				toAddress: address,
				value: value
			}),
		};
		return (await axios(options)).data;
	}

	async sendToken(address, value) {
		const options = {
			method: "POST",
			url: `https://api.seknot.net/token/${this.tokenAddress}/send`,
			headers: {
				authorization: "Bearer " + this.accessToken,
				"content-type": "application/json",
			},
			data: JSON.stringify({
				toAddress: address,
				value: value
			}),
		};
		return (await axios(options)).data;
	}
}

module.exports = APIController;