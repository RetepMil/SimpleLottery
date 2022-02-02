pragma solidity ^0.4.15;

contract Lottery {

    uint constant TICKET_PRICE = 1000 wei;
    uint ticketingCloses;

    address owner;
    address[] tickets;
    address winner;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function Lottery (uint duration) public {
        owner = msg.sender;
        ticketingCloses = now + duration;
    }
    
    // Use this function to buy a ticket
    function buyTicket (address buyerAddress) payable public {
	    require(msg.value >= TICKET_PRICE);
        addTicketAddress(buyerAddress);
    }

    function addTicketAddress (address addressNumber) public {
        tickets.push(addressNumber);
    }

    function getTicketAddress () public returns (address[] addresses) {
        addresses = tickets;
    }

    function random(uint seed) public view returns (uint) {    
        return uint(
             keccak256(block.blockhash(block.number-1), seed) 
        );
    } //use case : random(0x7543def) % 100;

    function drawWinner () public {
	    require(now > ticketingCloses + 5 minutes);
	    require(winner == address(0));

	    bytes32 rand = keccak256(
	    	block.blockhash(block.number-1)
	    );
	    winner = tickets[uint(rand) % tickets.length];
    }

    function checkIfWin (address ticketAddress) public view returns (bool) {
        return (winner == ticketAddress ? true : false);
    }

    function sendWinnerPrice () private {
	    require(winner != address(0));
        
        winner.transfer(1000 * tickets.length);
    }

    function destroy () public onlyOwner {
        selfdestruct(owner);
    }

}