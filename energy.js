import { TronWeb } from 'tronweb';
import dotenv from 'dotenv';

dotenv.config();

let energyNeeded = 4300000;
let energyUnit = 131000 * 5;
let netUnit = 267;
let energyPrice = 5 * 1000000;

let wallet = "TQsLQpHPmfenEFogZn5zXt67NYv5v828XF";
let energyProvider = "TAL8whxemNowFipAqzquBNTyCqnemXyGXc";

const privateKey = process.env.PK;
const apiKey = process.env.TRONGRID_API_KEY;
var fromAddress = "TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR"; //address _from
var toAddress = "TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr"; //address _to
var amount = 43000000; //amount
//Creates an unsigned TRX transfer transaction

const tronWeb = new TronWeb({
    fullHost: "https://api.trongrid.io",
    headers: { 'TRON-PRO-API-KEY': apiKey },
    privateKey: privateKey
});

tronWeb.trx.getAccountResources(fromAddress).then(data => {
    let energyLimit = 0;
    let energyUsed = 0;
    let netLimit = 0;
    let netUsed = 0;

    if (data['EnergyLimit']) {
        energyLimit = data['EnergyLimit'];
    }
    if (data['EnergyUsed']) {
        energyUsed = data['EnergyUsed'];
    }
    if (data['NetLimit']) {
        netLimit = data['NetLimit'];
    }
    if (data['NetUsed']) {
        netUsed = data['NetUsed'];
    }

    let energyAvailable = energyLimit - energyUsed;
    let netAvailable = netLimit - netUsed;

    console.log(energyAvailable);
    console.log(netAvailable);

    let count = Math.ceil((energyNeeded - energyAvailable) / energyUnit);
    let netCount = Math.floor(netAvailable / netUnit);
    console.log(count);
    console.log(netCount);
});

// tron.getaccountresource({ address: 'TQsLQpHPmfenEFogZn5zXt67NYv5v828XF', visible: true })
//     .then(async ({ data }) => {
//         let energyLimit = 0;
//         let energyUsed = 0;
//         if (data['EnergyLimit']) {
//             energyLimit = data['EnergyLimit'];
//         }
//         if (data['EnergyUsed']) {
//             energyUsed = data['EnergyUsed'];
//         }

//         let energyAvailable = energyLimit - energyUsed;
//         console.log(energyAvailable);

//         let count = Math.ceil((energyNeeded - energyAvailable) / energyUnit);
//         console.log(count);

//         for (let i = 0; i < count; i++) {
//             tradeobj = await tronWeb.transactionBuilder.sendTrx(
//                 toAddress,
//                 amount,
//                 fromAddress
//             );
//             const signedtxn = await tronWeb.trx.sign(
//                 tradeobj,
//                 privateKey
//             );
//             const receipt = await tronWeb.trx.sendRawTransaction(
//                 signedtxn
//             ).then(output => { console.log('- Output:', output, '\n'); });
//         }
//     })
//     .catch(err => console.error(err));