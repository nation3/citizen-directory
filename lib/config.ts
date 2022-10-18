interface Config {
  nationToken: string,
  appDomain: string,
  balancerDomain: string,
  etherscanDomain: string
}

const chain = process.env.NEXT_PUBLIC_CHAIN || "goerli";
const config: Config = {
  nationToken: '0x333A4823466879eeF910A04D473505da62142069',
  appDomain: chain === 'goerli' ? 'https://app-goerli.vercel.app' : 'https://app.nation3.org',
  balancerDomain: chain === 'goerli' ? 'https://goerli.balancer.fi' : 'https://app.balancer.fi',
  etherscanDomain: chain === 'goerli' ? 'https://goerli.etherscan.io' : 'https://etherscan.io'
}
console.log(config)

export const {
  nationToken,
  appDomain,
  balancerDomain,
  etherscanDomain
} = config
