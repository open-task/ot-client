import det_abi from '@/assets/detabi.js'
import abi from '@/assets/abi.js'

let token_address = '0x1231fE2e7479126b4bFF764f3359e2d03Da23f27'
let det_address = '0x04B703784D3d82B5d5E4C103d0bDb80169653f48'
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
