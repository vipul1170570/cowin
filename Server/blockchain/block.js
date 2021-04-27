const CryptoJS = require("crypto-js");

class Block {
	constructor(index, previousHash, timestamp, ApplicantData) {
		this.index = index
		this.previousHash = previousHash
		this.ApplicantData = ApplicantData
		this.timestamp = timestamp
		this.hash = this.calculateHash(index, previousHash, timestamp, ApplicantData)
	}

	calculateHashForBlock() {
		return this.calculateHash(this.index, this.previousHash, this.timestamp, this.ApplicantData)
	}

	calculateHash(index, previousHash, timestamp, ApplicantData) {
		return CryptoJS.SHA256(index + previousHash + timestamp + ApplicantData).toString()
	}
}

module.exports = {
	Block: Block
}