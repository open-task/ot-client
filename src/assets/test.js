import det_abi from '@/assets/detabi.js';
import abi from '@/assets/abi.js';
import { Dialog, Toast } from 'vant';

//rinkeby
// let token_address = '0x1231fE2e7479126b4bFF764f3359e2d03Da23f27'
// let det_address = '0x04B703784D3d82B5d5E4C103d0bDb80169653f48'
//kovan

let token_address = '0x6333f40a315E080f366EF126c5BFf1dd121E918C'
let det_address = '0x6ffF60A882CE1Cd793dC14261Eec0f0d6A470E21'

//正式
// let token_address = '0xf2880b0C2E61F831e3d53da1e2dF9505840E92Ac'
// let det_address = '0xF72DA6E99b864e26e3a386F2Cc6022882eCB1125'

let { ethereum } = window;
let web3 = ethereum && new Web3(ethereum);

export const checkBrowsers = () => {
    if( !ethereum ) {
        Dialog({ 
            message: '请安装metamask，或者使用imtoken2.0打开 bountinet.com' 
        });
        return;
    }
    return ethereum;
}

export const getWeb3Data = () => {
    if( checkBrowsers() ) {
        return {
            $web3api: web3,
            $task: web3.eth.contract(abi).at(token_address),
            $det: web3.eth.contract(det_abi).at(det_address),
            $token_address: token_address,
            $account: web3.eth.accounts && web3.eth.accounts[0] || '',
            $abi: abi
        }
    }
}

export const getMetamaskAccount = () => {
    if( checkBrowsers() ) {
        return ethereum.enable().catch(() => {
            Toast({
                message: '用户拒绝登录，请重试'
            })
        })
    }
}


// const getWeb3apiConfig = () => {
//     return new Promise( (res, rej) => {
//         // 参考imtoken文档
//         // https://docs.token.im/dapp-sdk/en/#introduction
//         window.addEventListener('load', async () => {
//             // Modern dapp browsers...
//             if (window.ethereum) {
//                 window.web3 = new Web3(ethereum);
//                 try {
//                     await ethereum.enable();
//                     res( getWeb3apiData(window.web3) );
//                 } catch (error) {
//                     // User denied account access...
//                     rej();
//                 }
//             }
//             // Legacy dapp browsers...
//             else if (window.web3) {
//                 window.web3 = new Web3(web3.currentProvider);
//                 res( getWeb3apiData(window.web3) );
//             }
//         });
        
//     } )
// }

