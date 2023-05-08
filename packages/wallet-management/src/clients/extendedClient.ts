import { StaticToken } from '@lifi/sdk';
import type {
  Account,
  Chain,
  RequestAddressesReturnType,
  Transport,
  WalletClient,
} from 'viem';
import { createWalletClient, custom } from 'viem';
import { ethersWalletToAccount } from 'viem/ethers';

type TTransport = Transport;
type TChain = Chain | undefined;
type TAccount = Account | undefined;

type ViemClient = WalletClient<TTransport, TChain, TAccount, true>;

export interface ExtendedWalletClient extends ViemClient {
  icon: string;
  installed: () => boolean;
  connect: () => Promise<RequestAddressesReturnType>;
  addToken: (chainId: number, token: StaticToken) => Promise<boolean>;
  getAddress: () => Promise<string | undefined>;
}

export interface ExtendedWalletClientConstructorArguments {
  name: string;
  icon: string;
  installed: () => boolean;
  provider?: any;
}

export function createExtendedWalletClient(
  args: ExtendedWalletClientConstructorArguments,
) {
  const client = createWalletClient({
    transport: custom(args.provider || (window as any).ethereum),
  });

  const finalwallet: ExtendedWalletClient = {
    ...client,
    ...args,
    connect: async () => client.requestAddresses(),
    addToken: async (chainId: number, token: StaticToken) => {
      try {
        await client.switchChain({ id: chainId });
        await client.watchAsset({
          /** Token type. */
          type: 'ERC20',
          options: {
            /** The address of the token contract */
            address: token.address,
            /** A ticker symbol or shorthand, up to 11 characters */
            symbol: token.symbol,
            /** The number of token decimals */
            decimals: token.decimals,
            /** A string url of the token logo */
            image: token.logoURI,
          },
        });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    getAddress: async () => {
      return (await client?.getAddresses())?.[0];
    },
  };

  return finalwallet;
}
