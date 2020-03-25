var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function () {
    window.ethereum.enable().then(function (accounts) {
        contractInstance = new web3.eth.Contract(window.abi, "0xbD869B09362e96962F7a410303942A5e3b1616c7", {
            from: "0x22b3Cf7c43E0BFFE5a5091b112cce98E5e1939B0"
        });
    });
    $("#get_winnings_button").click(getMyWinnings);
    $("#spin_it_button").click(play);
    $("#get_latest_queryid_button").click(getLatestQueryId);
});

function play() {
    var bet = $("#bet_input").val();
    var play = $("#play_input").val();
    var blockNumber = web3.eth.blockNumber;
    var queryId = "";

    contractInstance.methods.play(play)
        .send({
            value: web3.utils.toWei(bet, "ether")
        })
        .on('transactionHash', function (hash) {
            console.log("tx hash", hash);
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            console.log("conf", confirmationNumber);
        })
        .on('receipt', function (receipt) {
            console.log("receipt");
            console.log(receipt);

            queryId = receipt.events.logQueryId.returnValues.queryId;
            console.log("queryId:", queryId)

            // FIXME. not filterning by queryId...
            contractInstance.once('userWon', {
                filter: {
                    queryId: queryId
                },
                fromBlock: 0,
                toBlock: 'latest'
            }, function (error, event) {
                console.log("userWon event", event)
                console.log("teste queryID:", queryId)
                console.log("teste event.returnValues.queryId:", event.returnValues.queryId)

                if (event.returnValues.won && event.returnValues.queryId == queryId) {
                    $("#playResult_output").text("Yaaaaay!");
                } else {
                    $("#playResult_output").text("Nope!");
                }
            });
        })
}

function getMyWinnings() {
    contractInstance.methods.getCollectablePrizes().call().then(function (res) {
        console.log(res)
        $("#myBalance_output").text(res);
    });
}

// function getLatestQueryId() {
//     contractInstance.methods.getLatestQueryId().call().then(function (res) {
//         console.log(res)
//         $("#myQuery_output").text(res);
//     });
// }