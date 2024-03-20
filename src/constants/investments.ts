export const THE_GRAPH_URL = 'https://api.thegraph.com/subgraphs/name/hectordao-hec/hector-dao';
export const ETH_GRAPH_URL = 'https://api.thegraph.com/subgraphs/name/hectordao-hec/hector-eth';

export const THE_GRAPH_DATA_QUERY = `
query {
  protocolMetrics(first: 1000, orderBy: timestamp, orderDirection: desc) {
    id
    timestamp
    hecCirculatingSupply
    sHecCirculatingSupply
    totalSupply
    hecPrice
    marketCap
    totalValueLocked
    treasuryRiskFreeValue
    treasuryMarketValue
    nextEpochRebase
    nextDistributedHec
    treasuryDaiMarketValue
    treasuryDaiLPMarketValue
    treasuryDaiRiskFreeValue
    treasuryUsdcMarketValue
    treasuryUsdcLPMarketValue
    treasuryUsdcRiskFreeValue
    treasuryMIMMarketValue
    treasuryMIMRiskFreeValue
    treasuryWFTMMarketValue
    treasuryWFTMRiskFreeValue
    treasuryFRAXRiskFreeValue
    treasuryFRAXMarketValue
    treasuryInvestments
    treasuryBOOMarketValue
    treasuryBOORiskFreeValue
    treasuryCRVRiskFreeValue
    treasuryCRVMarketValue
    treasuryWETHRiskFreeValue
    treasuryWETHMarketValue
    currentAPY
    runwayCurrent
    treasuryHecDaiPOL
    bankBorrowed
    bankSupplied
    treasuryFantomValidatorValue
    treasuryFantomDelegatorValue
    treasuryTORLPValue
    treasuryDaiTokenAmount,
    treasuryUsdcTokenAmount,
    treasuryWFTMTokenAmount,
    treasuryFRAXTokenAmount,
    treasuryBOOTokenAmount,
    treasuryCRVTokenAmount,
    treasuryWETHTokenAmount,
    hecDaiTokenAmount,
  }
  tors(first: 1000, orderBy: timestamp, orderDirection: desc) {
    id
    timestamp
    torTVL
    supply
  }
}
`;

export const ETH_QUERY = `query {
    ethMetrics(first: 1, orderBy: timestamp, orderDirection: desc) {
      id
      timestamp
      treasuryBaseRewardPool
      treasuryIlluviumBalance
      treasuryEthMarketValue
      treasuryMaticBalance
      maticTokenAmount
      illuviumTokenAmount
    }
  }`;

export const CACHE_KEY_INVESTMENTS_GRAPH_STATS = 'investments/graph-stats';
export const CACHE_KEY_INVESTMENTS_GENERAL_STATS = 'investments/general-stats';
export const CACHE_KEY_INVESTMENTS_BUY_BACK = 'investments/buy-back';
export const CACHE_KEY_INVESTMENTS_INVESTMENTS = 'investments/investments';
export const CACHE_KEY_INVESTMENTS_PROTOCOLS = 'investments/protocols';
export const CACHE_KEY_INVESTMENTS_FNFTS = 'investments/fnfts';

export const ftmscanApiKey = '';
export const bybitApiKey = '';
export const bybitSecretKey = '';
export const gateioApiKey = '';
export const gateioSecretKey = '';
export const huobiApiKey = '';
export const huobiSecretKey = '';
export const moralisApiKey = '';

export type HuobiAccountBalance = {
    spotBalanceState: number;
    distributionType: string;
    balance: number;
    accountBalanceUsdt: string;
    success: boolean;
    accountBalance: string;
};

export const INVESTMENT_CONTRACT = '0xc9e3903D048BFc8E2dADE52c104271dED5303E0c';
