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


const getWeb3apiData = ( _api ) => ({
    $web3api: _api,
    $task: _api.eth.contract(abi).at(token_address),
    $det: _api.eth.contract(det_abi).at(det_address),
    $account: _api.eth.accounts && _api.eth.accounts.length && _api.eth.accounts[0] || '',
    $token_address: token_address,
    $abi: abi
})

const getWeb3apiConfit = () => {
    return new Promise( (res, rej) => {
        // 参考imtoken文档
        // https://docs.token.im/dapp-sdk/en/#introduction
        window.addEventListener('load', async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);
                try {
                    await ethereum.enable();
                    res( getWeb3apiData(window.web3) );
                } catch (error) {
                    // User denied account access...
                    console.log('用户拒绝账户访问');
                    rej();
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider);
                res( getWeb3apiData(window.web3) );
            }
        });
        
    } )
}

export default getWeb3apiConfit;

// let web3api, task, det
// try {
//     web3api = new Web3(web3.currentProvider);

//     task = web3api.eth.contract(abi).at(token_address);
//     det = web3api.eth.contract(det_abi).at(det_address)
// } catch (e) {
// console.log(e)
// }

// console.log(abi)

// export {
//     task,
//     web3api,
//     det,
//     token_address,
//     abi
// }
