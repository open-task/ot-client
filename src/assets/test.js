import det_abi from '@/assets/detabi.js'
import abi from '@/assets/abi.js'

let token_address = '0xf2880b0C2E61F831e3d53da1e2dF9505840E92Ac'
let det_address = '0xF72DA6E99b864e26e3a386F2Cc6022882eCB1125'
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
