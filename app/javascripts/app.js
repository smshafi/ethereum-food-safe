var accounts;
var account;
var web3;
var byteCode = '0x6080604052600060015534801561001557600080fd5b50610537806100256000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166345e7b800811461005b578063bbe42af8146100fa578063ec85862d14610121575b600080fd5b34801561006757600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526100f894369492936024939284019190819084018382808284375050604080516020601f818a01358b0180359182018390048302840183018552818452989b8a359b909a90999401975091955091820193509150819084018382808284375094975061022c9650505050505050565b005b34801561010657600080fd5b5061010f6102e6565b60408051918252519081900360200190f35b34801561012d57600080fd5b506101396004356102ed565b604051808060200186815260200185815260200184815260200180602001838103835288818151815260200191508051906020019080838360005b8381101561018c578181015183820152602001610174565b50505050905090810190601f1680156101b95780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b838110156101ec5781810151838201526020016101d4565b50505050905090810190601f1680156102195780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b610234610443565b838152602081018390526001546000101561026a5760018054600019016000908152602081905260409081902090910154908201525b6060810182905242608082015260015460009081526020818152604090912082518051849361029d928492910190610473565b50602082810151600183015560408301516002830155606083015180516102ca9260038501920190610473565b5060809190910151600490910155505060018054810190555050565b6001545b90565b6000818152602081815260408083206001808201546002808401546004850154855487519581161561010002600019011692909204601f810188900488028501880190965285845260609796879687968a96909594926003870192879183018282801561039b5780601f106103705761010080835404028352916020019161039b565b820191906000526020600020905b81548152906001019060200180831161037e57829003601f168201915b5050845460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959a50869450925084019050828280156104295780601f106103fe57610100808354040283529160200191610429565b820191906000526020600020905b81548152906001019060200180831161040c57829003601f168201915b505050505090509450945094509450945091939590929450565b60a06040519081016040528060608152602001600081526020016000815260200160608152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106104b457805160ff19168380011785556104e1565b828001600101855582156104e1579182015b828111156104e15782518255916020019190600101906104c6565b506104ed9291506104f1565b5090565b6102ea91905b808211156104ed57600081556001016104f75600a165627a7a72305820bd8e7cf6aae8fd40095f84ba77d5c339c3f687986c7bb36335f708acd85db7850029';
var ABI_DEFINITION = JSON.parse('[{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"locationID","type":"uint256"},{"name":"secret","type":"string"}],"name":"addNewLocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"GetTrailCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"trailNo","type":"uint256"}],"name":"GetLocation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]');

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
                web3.eth.defaultAccount = account;

      
            });
        },
        createContract: function () {

            
            
            const Contract = new web3.eth.Contract(ABI_DEFINITION,
             { data: byteCode, from: account, gas: 4700000 }
            );

            Contract.deploy()
             .send(function (error, transactionHash) {
                 alert('Contract mined! transactionHash: ' + transactionHash);
              })
             .then((result) => {
                 document.getElementById("contractAddress").value = result.options.address;
             })
           

        },
        addNewLocation: function () {

            var CONTRACT_ADDRESS = document.getElementById("contractAddress").value;
            var foodsafeContract = new web3.eth.Contract(ABI_DEFINITION, CONTRACT_ADDRESS);
            var locationId = document.getElementById("locationId").value;
            var locationName=document.getElementById("locationName").value;
            var locationSecret = document.getElementById("locationSecret").value;
            var passPhrase = document.getElementById("passPhrase").value;
            var encryptedSecret=CryptoJS.AES.encrypt(locationSecret,passPhrase).toString();

            foodsafeContract.methods.addNewLocation(locationName, locationId, encryptedSecret).send({ from: account, gas: 4700000 }, function (error, result) {
                if(result!=null){
                    alert("Location is inserted");
                }
            });

        },
        getCurrentLocation: function(){
            
            var CONTRACT_ADDRESS = document.getElementById("contractAddress").value;
            var foodsafeContract = new web3.eth.Contract(ABI_DEFINITION, CONTRACT_ADDRESS);
            foodsafeContract.methods.GetTrailCount().call()
            .then((trailcount) => {
                alert(trailcount);
                foodsafeContract.methods.GetLocation(trailcount - 1).call()
                .then((returnValus) => {

                    document.getElementById("locationId").value = returnValus[1];
                    document.getElementById("locationName").value = returnValus[0];

                    var passPhrase = document.getElementById("passPhrase").value;
                    if (passPhrase!= null) {
                        var encryptedSecret = returnValus[4];
                        var decryptedSecret = CryptoJS.AES.decrypt(encryptedSecret, passPhrase).toString(CryptoJS.enc.Utf8);
                        document.getElementById("locationSecret").value = decryptedSecret;
                    }
                })
            })
            
        },
    };

window.addEventListener('load', function () {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));         
        }
        
        App.start();
    });
