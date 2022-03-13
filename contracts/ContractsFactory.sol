pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract ContractsFactory {
    event DeployNewERC20Token(address tokenAddress);
    event DeployNewERC721Token(address tokenAddress);

    function deployNewERC20Token(
        string memory name,
        string memory symbol
    ) public returns (address) {
        IERC20 t = new ERC20(
            name,
            symbol
        );
        emit DeployNewERC20Token(address(t));
    
        return address(t);
    }

    function deployNewERC721Token(string memory name, string memory symbol)
        public returns (address)
    {
        IERC721 t = new ERC721(name, symbol);
        emit DeployNewERC721Token(address(t));

        return address(t);
    }
}