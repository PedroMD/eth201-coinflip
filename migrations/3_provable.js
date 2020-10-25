const ProvableAPI = artifacts.require("ProvableAPI");

module.exports = function(deployer) {
  deployer.deploy(ProvableAPI);
};
