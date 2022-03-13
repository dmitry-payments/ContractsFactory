pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract ContractsFactory {
    event DeployNewERC20Token(address tokenAddress);
    event DeployNewERC721Token(address tokenAddress);

    function deployNewERC20Token(
        string calldata name,
        string calldata symbol,
        uint8 decimals,
        uint256 initialSupply
    ) public returns (address) {
        ERC20Token t = new ERC20Token(
            name,
            symbol,
            decimals,
            initialSupply,
            msg.sender
        );
        emit DeployNewERC20Token(address(t));
    
        return address(t);
    }

    function deployNewERC721Token(string memory name, string memory symbol)
        public returns (address)
    {
        ERC721Token t = new ERC721Token(name, symbol);
        emit DeployNewERC721Token(address(t));

        return address(t);
    }
}