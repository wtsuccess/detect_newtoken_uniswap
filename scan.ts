import { Contract } from "ethers";
import {
  uniswapV2FactoryAddress,
  uniswapV2RouterAddress,
} from "./constant/address";
import { provider } from "./constant/provider";
import { uniswapV2FactoryAbi } from "./abi/uniswapV2FactoryAbi";
import { uniswapV2RouterAbi } from "./abi/uniswapV2RouterAbi";

// Connect to an Ethereum provider (e.g., Infura)
// const provider = new InfuraProvider('mainnet', 'YOUR_INFURA_PROJECT_ID');

const uniswapV2Factory = new Contract(
  uniswapV2FactoryAddress,
  uniswapV2FactoryAbi,
  provider
);
const uniswapV2Router = new Contract(
  uniswapV2RouterAddress,
  uniswapV2RouterAbi,
  provider
);

uniswapV2Factory.on("PairCreated", async (token0, token1, pair, event) => {
  // Extract relevant information from the event
  const block = await provider.getBlock(event.blockNumber);
  if (!block) return;
  const timestamp = block.timestamp;
  //   const tx = await stake["claim"](
  //     Number(await stake["stakedCount"](signer)) - 1
  //   );
  // Query additional information about the tokens and liquidity
  const token0Info = await uniswapV2Router.getTokenInfo(token0);
  const token1Info = await uniswapV2Router.getTokenInfo(token1);
  const liquidity = await uniswapV2Router.getReserves(pair);

  // Print or store the extracted information as needed
  console.log(`Token0 Address: ${token0}`);
  console.log(`Token1 Address: ${token1}`);
  console.log(`Pair Address: ${pair}`);
  console.log(`Timestamp: ${timestamp}`);
  console.log(`Liquidity: ${liquidity}`);
});
