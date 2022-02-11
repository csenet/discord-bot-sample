const mongoose = require("mongoose");
const User = require("../models/user");

class dbController {
	constructor() {
		mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongo:27017`);
		this.User = mongoose.model("Users");
	}

	async createUser(account, address) {
		const userInfo = new this.User({
			account: account,
			address: address,
		});
		await userInfo.save();
	}

	async getAllUsers() {
		const data = this.User.find({});
		return data;
	}

	async getUserByAccount(account) {
		const data = this.User.find({
			account: account
		});
		return data;
	}
}

module.exports = dbController;