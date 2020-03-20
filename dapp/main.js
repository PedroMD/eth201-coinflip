var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function () {
    window.ethereum.enable().then(function (accounts) {
        contractInstance = new web3.eth.Contract(window.abi, "0x3D93d45e866A45dbe37385c81f17247609D25838", {
            from: "0x2e57E4e4aCE76D274d42Ef302867da597a7e9B7f"
        });
    });
    $("#get_winnings_button").click(getMyWinnings);
    $("#spin_it_button").click(play);

});

function play() {
    var bet = $("#bet_input").val();
    var play = $("#play_input").val();

    contractInstance.methods.play(play)
        .send({
            value: web3.utils.toWei(bet, "ether")
        })
        .on('transactionHash', function (hash) {
            console.log("tx hash");
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            console.log("conf");
            console.log(conf);
        })
        .on('receipt', function (receipt) {
            console.log("receipt");
            console.log(receipt);
            if(receipt.events.userWon.returnValues.won){
                $("#playResult_output").text("Yaaaay!!");
            }
            else {
                $("#playResult_output").text("Nope!");
            }
        })
}

function getMyWinnings() {
    contractInstance.methods.getMyBalance().call().then(function (res) {
        console.log(res)
        displayInfo(res);
    });
}

function displayInfo(res) {
    $("#myBalance_output").text(res);
}