export const appConfig = {
  chainId: process.env.chainId || 'eip155:44787',
  portalClientApiKey: process.env.portalClientApiKey || '',
  rpcConfig: {
    'eip155:44787': 'https://alfajores-forno.celo-testnet.org',
    'eip155:42220': 'https://forno.celo.org',
  },
};
