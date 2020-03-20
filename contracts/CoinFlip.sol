pragma solidity 0.5.12;
import "./Ownable.sol";

contract CoinFlip {
    uint256 public balance;

    mapping(address => uint) public playersCollectablePrizes;

    event userWon(address player, bool won);

    modifier minimumBet(uint256 betValue) {
        require(betValue >= 1 ether, "minimum play is 1 eth");
        _;
    }

    function collectPrizes() public returns (uint collected){
            uint256 toTransfer = playersCollectablePrizes[msg.sender];
            playersCollectablePrizes[msg.sender]= 0;
            msg.sender.transfer(toTransfer);
            return toTransfer;
    }

    function getMyBalance() public returns (uint userBalance){
            return playersCollectablePrizes[msg.sender];
    }
    
    function play(uint256 bet) public payable minimumBet(msg.value) returns (bool won){
        bool winner = false;

        if(bet != 0 && bet != 1){
            revert("Please chose 1 or 0 as input");
        }
        else {
            if((now % 2 == 0 && bet == 0) || (now % 2 == 1 && bet == 1)) {
                // user wins
                playersCollectablePrizes[msg.sender] += balance + msg.value;
                balance = 0;
                winner = true;
            }
            else{
                balance += msg.value;
            }
            emit userWon(msg.sender, winner);
            return winner;
        }
    }
}

