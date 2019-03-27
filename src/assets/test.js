import det_abi from '@/assets/detabi.js'
import abi from '@/assets/abi.js'

let token_address = '0xA3434f0ABAC66f46ABCf2E6c47488C00aA1980Cb'
let det_address = "0x6ffF60A882CE1Cd793dC14261Eec0f0d6A470E21"
let web3api = new Web3(web3.currentProvider);
let accounts = web3api.eth.accounts;
let task = web3api.eth.contract(abi).at(token_address);
let det = web3api.eth.contract(det_abi).at(det_address)


export {task,web3api,det} 

