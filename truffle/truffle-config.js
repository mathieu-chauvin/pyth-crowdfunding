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

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks : {
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
