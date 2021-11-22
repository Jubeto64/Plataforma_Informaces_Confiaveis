const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHah = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHah = previousHah;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHah + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHah = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currenBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currenBlock.hash !== currenBlock.calculateHash()){
                return false;
            }

            if(currenBlock.previousHah !== previousBlock.hash){
                return false;
            }

            return true;
        }
    }
}

let savjeeCoin = new BlockChain();

console.log('Mining block 1...');
savjeeCoin.addBlock(new Block(1, "10/07/2017", { amount: 4}));

console.log('Mining block 2...');
savjeeCoin.addBlock(new Block(2, "12/07/2017", {amount: 10}));

