const chai = require('chai');
const { expect } = chai;
const BN = require('bn.js');
const { ContractFactory } = require('ethers');
const FACTORY = artifacts.require("./ContractsFactory.sol");
const ERC20TOKEN = artifacts.require("./ERC20.sol");
const ERC721TOKEN = artifacts.require("./ERC721.sol");

chai.use(require('chai-bn')(BN));

contract('ContractsFactory', function (accounts) { //accounts - адреса задепллоенных кошельков которые создаст hardhat для тестирования
  const [owner, account1, account2] = accounts; //const owner = accounts[0];

  before(async function () { 
    this.token = await FACTORY.new("DESU", "DESU", { from: owner });
    this.ERC20Token = await ERC20TOKEN.new("DESU", "DESU", { from: owner });
    this.ERC721Token = await ERC721TOKEN.new("DESU", "DESU", { from: owner }); 
});

describe('method: deployNewERC20Token', async function () {  
    it('positive', async function() {
      ERC20address = await this.token.deployNewERC20Token(
        "Demo ERC20Token",
        "DEMO20"
      );
      console.log(ERC20address);
    });
});

describe('method: DeployNewERC721Token', async function () {  
  it('positive', async function() {
    ERC721address = await this.token.deployNewERC721Token(
      "Demo ERC20Token",
      "DEMO20"
    );
    console.log(ERC721address);
  });
});

  it("Should mint a new ERC721 item", async () => {
    const TokenInstance = await ERC721TOKEN.at(ERC721Token.logs[0].args.tokenAddress);
    const minter = accounts[1];
    const uri = 'https://ipfs.io/ipfs/QmYGgEFqTRkWvNZ6u7gfk9HDdh55bQAbYVyc16TF1zX658/3503'
    const tx = await TokenInstance.awardItem(minter, uri)
    const tokenIdBN = tx.logs[1].args.newItemId;
    const tokenId = tokenIdBN.toNumber()
    const owner = await TokenInstance.ownerOf.call(tokenId);
    const tokenUri = await TokenInstance.tokenURI.call(tokenId);
    expect(owner).to.equal(minter)
    expect(tokenUri).to.equal(uri);
  });
});

  