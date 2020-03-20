const CoinFlip = artifacts.require("CoinFlip");
const truffleAssert = require("truffle-assertions");

contract("CoinFlip", async function(accounts){

  let instance;
  // 0: 0x45fB0F93d301dDeB49374363ebBB47AF2904944C
  // 1: 0xA5b0DEE4e8f605A8355a9Fd0FE8b9390c9405C64
  console.log(accounts[0]);

  before(async function(){
    instance = await CoinFlip.deployed()
  });

  it("should do something", async function(){
    for(i = 0; i<=4; i++) {
        let result = await instance.play(1, {value: web3.utils.toWei("1", "ether"), from: accounts[2]});
    console.log(result.receipt.logs)
    }
    
  });

});
