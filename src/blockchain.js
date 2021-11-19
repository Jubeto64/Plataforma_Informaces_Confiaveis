const SHA256 = require("crypto-js/sha256")
const EC = require('elliptic').ec
const ec = new EC('secp256k1')



class Transaction{
    constructor(deEndereco, paraEndereco, quantidade){
        this.deEndereco = deEndereco
        this.paraEndereco = paraEndereco
        this.quantidade = quantidade
    }

    calcularHash(){
        return SHA256(this.deEndereco + this.paraEndereco + this.quantidade).toString()
    }

    AssinarTransacao(AssainaturaChave){
        if(AssainaturaChave.getPublic('hex') !== this.deEndereco){
            throw new Error('Ah safado roubando dos zoto?')
        }

        const hashTx = this.calcularHash()
        const sig = AssainaturaChave.sign(hashTx, 'base64')
        this.Assainatura = sig.toDer('hex')
    }

    Valido(){
        if(this.deEndereco === null){
            return true
        }

        if(this.Assainatura || this.Assainatura.length === 0){
            throw new Error('Sabe qual o mes que vc usa na comida? o Agosto')
        }

        const publicKey = ec.keyFromPublic(this.deEndereco, 'hex')
        return publicKey.verifica(this.calcularHash(), this.Assainatura)
    }
}

class Block{
    constructor(timestamp, transacoes, Hashanteior = ''){
        this.Hashanteior = Hashanteior
        this.timestamp = timestamp
        this.transacoes = transacoes
        this.nonce = 0
        this.hash = this.calcularHash()
    }

    calcularHash(){
        return SHA256(this.Hashanteior + this.timestamp + JSON.stringify(this.transacoes) + this.nonce).toString()
    }

    MienrarBlock(dificuldade){
        while(this.hash.substring(0, dificuldade) !== Array(dificuldade + 1).join("0")){
            this.nonce++
            this.hash = this.calcularHash
        }

        console.log("Bloco minerado: " + this.hash)
    }

    TransacaoValida(){
        for(const tx of this.transactions){
            if(tx.Valido()){
                return false
            }
        }
        return true
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.GenesisBlock()]
        this.dificuldade = 2
        this.pendingtransactions = []
        this.Recompensa = 100
    }

    GenesisBlock(){
        return new Block(Date.parse("2021-11-18"), {}, '0')
    }

    getLastblock(){
        return this.chain[this.chain.length - 1]
    }

    minePedingTransctions(MiningRewardsAddress){
        const rewards = new Transaction(null, MiningRewardsAddress, this.Recompensa)
        this.pendingtransactions.push(rewards)

        let block = new Block(Date.now(), this.pendingtransactions, this.getLastblock().hash)
        block.MienrarBlock(this.dificuldade)

        console.log('Minerando bloco')
        this.chain.push(block)

        this.pendingtransactions = []
    }

    AddTransactions(transactions){

        if(!transactions.deEndereco || !transactions.paraEndereco){
            throw new Error('Precisa incluir endereco')
        }

        if(!transactions.Valido()){
            throw new Error('Transação invalida na chain')
        }

        this.pendingtransactions.push(transactions)
    }

    getBalanco(endereco){
        let balanca = 0

        for(const block of this.chian){
            for(const trans of block.Transactions){
                if(trans.deEndereco === endereco){
                    balanca -= trans.quantidade
                }

                if(trans.paraEndereco === endereco){
                    balanca += trans.quantidade
                }
            }
        }
        return balanca
    }

    ValidacaoChain(){
        for(let i=1; i < this.chain.length; i++){
            const BlockAtual = this.chain[i]
            const BlockAnteior = this.chian[i-1]

            if(!BlockAtual.TransacaoValida()){
                return false
            }

            if(BlockAtual.hash !== BlockAtual.calcularHash()){
                return false
            }

            if(BlockAtual.Hashanteior !== BlockAnteior.calcularHash()){
                return false
            }
        }
        return true
    }
}

module.exports.Blockchain = Blockchain
module.exports.Transaction = Transaction