const Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/2d9a378fb0f845e9b22794d4d7d3a8c4"
);

const account1 = "0x28F127E54fB3C272fDcB37b3f4D0f5A3AFdc2668";

const privatekey1 = Buffer.from(process.env.PRIVATE_KEY_1, "hex");

// web3.eth.getBalance(account1, (err, result) => {
//   console.log(result);
// });

// web3.eth.getBalance(account2, (err, result) => {
//   console.log(result);
// });

const address = "0x7a6dB80d02CeE9e36d5A812AaD650cf1Ee9b220a";
const contractABI = [
  {
    constant: false,
    inputs: [
      { name: "_rId", type: "string" },
      { name: "_pId", type: "string" },
      { name: "_lat", type: "uint256" },
      { name: "_long", type: "uint256" },
      { name: "_ipfsHash", type: "string" },
      { name: "_type", type: "uint8" },
      { name: "_status", type: "uint8" }
    ],
    name: "addNewPhoto",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_rId", type: "string" },
      { name: "_pId", type: "string" },
      { name: "_status", type: "uint8" }
    ],
    name: "changeStatus",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_rId", type: "string" },
      { name: "_pId", type: "string" }
    ],
    name: "retrievePhoto",
    outputs: [
      { name: "", type: "uint256" },
      { name: "", type: "uint256" },
      { name: "", type: "string" },
      { name: "", type: "uint256" },
      { name: "", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "complaintsCount",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "photosCount",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  }
];

var contract = new web3.eth.Contract(contractABI, address);
//console.log(contract.methods);
contract.methods.photosCount().call((err, res) => {
  console.log(res);
});

const data = contract.methods
  .addNewPhoto("r1", "p1", 12345678, 23456789, "HASHAHSHASH", 0, 5)
  .encodeABI();

//Build the transaction
web3.eth.getTransactionCount(account1, (err, txCount) => {
  //get smart contract data

  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    to: address,
    data: data
  };

  // Sign the transaction
  const tx = new Tx(txObject, { chain: "ropsten", hardfork: "petersburg" });
  tx.sign(privatekey1);
  const serializedTransaction = tx.serialize();
  const raw = "0x" + serializedTransaction.toString("hex");
  //console.log(raw);
  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("err:", err);
    console.log("txHash:", txHash);
  });
});
