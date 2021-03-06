const CryptoJS = require("crypto-js");
const block = require('./block');

class Blockchain {
    constructor() {
        this.blockChain = [this.getInitialBlock()];
    }

    getInitialBlock() {
        const timestamp = new Date().getTime() / 1000;
        return new block.Block(0, "0000", 1587148020.703, "Start From ID 1");
    }

    getBlockchain() {
        return this.blockChain
    }

    getLatestBlock() {
        return this.blockChain[this.blockChain.length - 1]
    }

    generateNextBlock(ApplicantData) {
        const previousBlock = this.getLatestBlock()
        const previousHash = previousBlock.hash
        const index = previousBlock.index + 1
        const timestamp = new Date().getTime() / 1000
        return new block.Block(index, previousHash, timestamp, ApplicantData)
    }

    addBlock(newBlock) {
        if (this.isValidNewBlock(this.getLatestBlock(), newBlock)) {
            this.blockChain.push(newBlock)
            return true
        }
        return false
    }

    isValidNewBlock(previousBlock, newBlock) {
        if (previousBlock.index + 1 !== newBlock.index) {
            console.log('invalid index');
            return false;
        } else if (previousBlock.hash !== newBlock.previousHash) {
            console.log('invalid previoushash');
            return false;
        } else if (newBlock.calculateHashForBlock() !== newBlock.hash) {
            console.log(typeof (newBlock.hash) + ' ' + typeof newBlock.calculateHashForBlock());
            console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
            return false;
        }
        return true;
    }

    isValidBlockChain(){
        if (this.blockChain[0].toString() != this.getInitialBlock().toString()) {
            return false;
		}
		var tempBlocks = [this.blockChain[0]];
		for (var i = 1; i < this.blockChain.length; i++) {
			if (this.isValidNewBlock(tempBlocks[i - 1], this.blockChain[i])) {
				tempBlocks.push(this.blockChain[i]);
			} else {
				return false;
			}
		}
		return true;
    };
    
    replaceBlockChain(newBlockChain) {
        if (this.isValidBlockChain(newBlockChain) && newBlockChain.length > this.blockChain.length) {
            console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
            this.blockchain = newBlockChain;
            return true;
        }else {
            console.log('Received blockchain invalid');
            return false;
        }
    }
}

module.exports = {
	Blockchain: Blockchain
}