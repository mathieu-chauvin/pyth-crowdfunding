/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "ordinary hold evidence finish plunge travel resist agent gather window same empty";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks : {
        ropsten: {
                provider: function() {
                          return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/2b3f64bdc98b4a14a8c65c8bd86b0fb0");
                              },
                network_id: '3',
                  },
        localnode: {
            network_id: "*",
            host: "localhost",
            port: 8545,
            
            from:"0x206F8F4F14031cDD627c9231d246C468700C8526" 
        },
        ganachenode: {
            network_id: "*",
            host: "localhost",
            port: 7545
        }

    }
};
