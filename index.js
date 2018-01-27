import {SHA256} from "crypto-js"
class Block {
    constructor(index, timestamp, data, previousHash){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash = this.calculateHash()
    }
    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }
}
class BlockChain{
    constructor(){
        this.chain=[this.createGenesisBlock()]
    }

    /*
     * Gensis block is the first block in the chain and it don't have previous hash value
     *
     * */
    createGenesisBlock(){
        return new Block(0,new Date(), "Genesis Block", "");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(data){
        let index = this.chain.length
        this.chain.push(new Block(index, new Date(),data, this.getLatestBlock().hash))
    }
    isChainValid(){
        let chain = this.chain;
        let length =  this.chain.length;
        for(let i =1; i< length; i++){
            let block = chain[i]
            if(block.calculateHash()!== block.hash||block.previousHash!==chain[i-1].hash){
                return false
            }
        }
        return true
    }
}
/*
* tempring of block chain sample
* tempring of block chain requires to, not only modify the hash of tempered block but also the previousHash and hash of
* following blocks as shown in following example 28 jan 2018. But creating hash and temprng any block is not an easy
* process because of "Proof Of Work". Which delays the process of creating hash by 10 minutes. This make it difficult to
* temper any kind of block
* */
const japeshCoin = new BlockChain();
japeshCoin.addBlock({amount:4})
japeshCoin.addBlock({amount:10})
console.log(japeshCoin.isChainValid())
japeshCoin.chain[1].data.amount=100
japeshCoin.chain[1].hash = japeshCoin.chain[1].calculateHash();
console.log(japeshCoin.isChainValid())
japeshCoin.chain[2].previousHash = japeshCoin.chain[1].hash
japeshCoin.chain[2].hash = japeshCoin.chain[2].calculateHash();
console.log(japeshCoin.isChainValid())
// console.log(JSON.stringify(japeshCoin));