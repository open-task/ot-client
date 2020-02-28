import det_abi from '@/assets/detabi.js'
import abi from '@/assets/abi.js'

//rinkeby
// let token_address = '0x1231fE2e7479126b4bFF764f3359e2d03Da23f27'
// let det_address = '0x04B703784D3d82B5d5E4C103d0bDb80169653f48'
//kovan

let token_address = '0x6333f40a315E080f366EF126c5BFf1dd121E918C'
let det_address = '0x6ffF60A882CE1Cd793dC14261Eec0f0d6A470E21'

//正式
// let token_address = '0xf2880b0C2E61F831e3d53da1e2dF9505840E92Ac'
// let det_address = '0xF72DA6E99b864e26e3a386F2Cc6022882eCB1125'


let web3api, task, det
try {
    web3api = new Web3(web3.currentProvider);

    task = web3api.eth.contract(abi).at(token_address);
    det = web3api.eth.contract(det_abi).at(det_address)
} catch (e) {
console.log(e)
}

console.log(abi)

export {
    task,
    web3api,
    det,
    token_address,
    abi
}
