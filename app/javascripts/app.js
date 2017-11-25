//import "../stylesheets/app.css";
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import { default as CryptoJS } from 'crypto-js'
var accounts;
var account;
//var foodSafeABI;
//var browser_ballot_sol_foodSafeContract;
//var foodSafeCode;
window.App = {
  start: function() {
    var self = this;
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      web3.eth.defaultAccount=account;
      
     //var foodSafeSource="pragma solidity ^0.4.6;contract FoodSafe { struct Location {    string name;  uint locationID;   uint previousLocationID;   string secret;    uint timestamp;} mapping(uint=>Location) Trail;uint8 trailcount=0;function addNewLocation(string name,uint locationID,string secret){    Location memory newLocation;    newLocation.name=name;    newLocation.locationID=locationID;    if (trailcount!=0)    {        newLocation.previousLocationID=Trail[trailcount-1].locationID;    }    newLocation.secret=secret;    newLocation.timestamp=now;    Trail[trailcount]=newLocation;    trailcount++;} function GetTrailCount() returns(uint8)  {    return trailcount;} function GetLocation(uint8 trailNo) returns(string,uint,uint,uint,string){    return (Trail[trailNo].name,Trail[trailNo].locationID,Trail[trailNo].previousLocationID,Trail[trailNo].timestamp,Trail[trailNo].secret);}}";
      /*web3.eth.compile.solidity(foodSafeSource,function(error,foodSafeCompiled){
        if(error){
          alert("error-"+ error);
        }
        alert (foodSafeCompiled);
        foodSafeABI=foodSafeCompiled['<stdin>:FoodSafe'].info.abiDefinition;
        foodSafeContract=web3.eth.contract(foodSafeABI);
        foodSafeCode=foodSafeCompiled['<stdin>:FoodSafe'].info.code;
      });*/
    });
  },
  createContract: function(){
    
    /*var contractInstance=foodSafeContract.new({data:foodSafeCode,from:account,gas:3600000},(error,deployedContract)=>{
      if(error){
        alert(error);
        return;
      }
      if(deployedContract.address){
        document.getElementById("contractAddress").value=deployedContract.address;
      }
    });*/
    var browser_ballot_sol_foodsafeContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"locationID","type":"uint256"},{"name":"secret","type":"string"}],"name":"addNewLocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"GetTrailCount","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"trailNo","type":"uint8"}],"name":"GetLocation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]);
    var browser_ballot_sol_foodsafe = browser_ballot_sol_foodsafeContract.new(
       {
         from: web3.eth.accounts[0], 
         data: '0x60606040526000600160006101000a81548160ff021916908360ff160217905550341561002b57600080fd5b6106b18061003a6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806345e7b8001461005c578063bbe42af814610105578063e3fd1ec214610134575b600080fd5b341561006757600080fd5b610103600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610254565b005b341561011057600080fd5b61011861038a565b604051808260ff1660ff16815260200191505060405180910390f35b341561013f57600080fd5b610158600480803560ff169060200190919050506103a1565b604051808060200186815260200185815260200184815260200180602001838103835288818151815260200191508051906020019080838360005b838110156101ae578082015181840152602081019050610193565b50505050905090810190601f1680156101db5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156102145780820151818401526020810190506101f9565b50505050905090810190601f1680156102415780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b61025c61057c565b838160000181905250828160200181815250506000600160009054906101000a900460ff1660ff161415156102bf5760008060018060009054906101000a900460ff160360ff168152602001908152602001600020600101548160400181815250505b8181606001819052504281608001818152505080600080600160009054906101000a900460ff1660ff16815260200190815260200160002060008201518160000190805190602001906103139291906105b8565b50602082015181600101556040820151816002015560608201518160030190805190602001906103449291906105b8565b50608082015181600401559050506001600081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff1602179055505050505050565b6000600160009054906101000a900460ff16905090565b6103a9610638565b60008060006103b6610638565b6000808760ff1681526020019081526020016000206000016000808860ff168152602001908152602001600020600101546000808960ff168152602001908152602001600020600201546000808a60ff168152602001908152602001600020600401546000808b60ff168152602001908152602001600020600301848054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104c65780601f1061049b576101008083540402835291602001916104c6565b820191906000526020600020905b8154815290600101906020018083116104a957829003601f168201915b50505050509450808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105625780601f1061053757610100808354040283529160200191610562565b820191906000526020600020905b81548152906001019060200180831161054557829003601f168201915b505050505090509450945094509450945091939590929450565b60a06040519081016040528061059061064c565b815260200160008152602001600081526020016105ab61064c565b8152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106105f957805160ff1916838001178555610627565b82800160010185558215610627579182015b8281111561062657825182559160200191906001019061060b565b5b5090506106349190610660565b5090565b602060405190810160405280600081525090565b602060405190810160405280600081525090565b61068291905b8082111561067e576000816000905550600101610666565b5090565b905600a165627a7a723058205e19480f55ecfd8b615f3b33a176544b17103e4d66a4d3dbb2d3f702077726870029', 
         gas: '4700000'
       }, function (e, contract){
        if (typeof contract.address !== 'undefined') {
             alert('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
             document.getElementById("contractAddress").value=contract.address;
        }
     });
  },
  addNewLocation: function(){
    
    var browser_ballot_sol_foodsafeContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"locationID","type":"uint256"},{"name":"secret","type":"string"}],"name":"addNewLocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"GetTrailCount","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"trailNo","type":"uint8"}],"name":"GetLocation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]);
    var contractAddress=document.getElementById("contractAddress").value;
    var deployedFoodSafe=browser_ballot_sol_foodsafeContract.at(contractAddress);
    var locationId=document.getElementById("locationId").value;
    var locationName=document.getElementById("locationName").value;
    var locationSecret=document.getElementById("locationSecret").value;
    var passPhrase=document.getElementById("passPhrase").value;
    var encryptedSecret=CryptoJS.AES.encrypt(locationSecret,passPhrase).toString();
    deployedFoodSafe.addNewLocation(locationName,locationId,encryptedSecret,function(err){
      alert("Location is inserted");
    });

  },
  getCurrentLocation: function(){
    var browser_ballot_sol_foodsafeContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"locationID","type":"uint256"},{"name":"secret","type":"string"}],"name":"addNewLocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"GetTrailCount","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"trailNo","type":"uint8"}],"name":"GetLocation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]);
    var contractAddress=document.getElementById("contractAddress").value;
    var deployedFoodSafe=browser_ballot_sol_foodsafeContract.at(contractAddress);
    
    var passPhrase=document.getElementById("passPhrase").value;
    deployedFoodSafe.GetTrailCount.call(function(err,trailcount){
      deployedFoodSafe.GetLocation.call(trailcount-1,function(error,returnValus){
        document.getElementById("locationId").value=returnValus[1];
        document.getElementById("locationName").value=returnValus[0];
        var encryptedSecret=returnValus[4];
        var decryptedSecret=CryptoJS.AES.decrypt(encryptedSecret,passPhrase).toString(CryptoJS.enc.Utf8);
        document.getElementById("locationSecret").value=decryptedSecret;
      });
    });
  },
};

window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source.  If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});
