import { supportedChains } from '@lifi/sdk';
import { ProviderIdentityFlag } from './types';
import { walletIcons } from './walletIcons';
import type { ExtendedWalletClient } from './clients/extendedClient';
import { createExtendedWalletClient } from './clients/extendedClient';
import WalletConnectProvider from '@walletconnect/ethereum-provider';

const defaultWallet: ExtendedWalletClient = createExtendedWalletClient({
  // unknown Default wallet that injects as metamask but is not metamask
  name: 'Default Wallet',
  installed: () =>
    !!(window as any).ethereum &&
    !(window as any)?.ethereum?.[ProviderIdentityFlag.MetaMask],
  icon: walletIcons.placeholder,
});

const metamask: ExtendedWalletClient = createExtendedWalletClient({
  name: 'MetaMask',
  installed: () => !!(window as any)?.ethereum?.[ProviderIdentityFlag.MetaMask],
  icon: walletIcons.metamask,
});

const walletConnect: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Wallet Connect',
  installed: () => true,
  icon: walletIcons.walletConnect,
  provider: new WalletConnectProvider({
    rpc: Object.fromEntries(
      supportedChains.map((chain) => {
        return [chain.id, chain.metamask.rpcUrls[0] || ''];
      }),
    ),
  }),
});

const frontier: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Frontier',
  installed: () => (window as any).frontier,
  icon: walletIcons.frontier,
  provider: (window as any).frontier?.ethereum,
});

const brave: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Brave',
  installed: () =>
    // eslint-disable-next-line no-underscore-dangle
    (navigator as any).brave && (window as any)._web3Ref,
  icon: walletIcons.brave,
});

const mathWallet: ExtendedWalletClient = createExtendedWalletClient({
  name: 'MathWallet',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.MathWallet],
  icon: walletIcons.mathwallet,
});

const tallyho: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Taho',
  installed: () =>
    (window as any).tally &&
    (window as any).tally?.[ProviderIdentityFlag.TallyHo],
  icon: walletIcons.tallyho,
  provider: (window as any).tally,
});

const blockWallet: ExtendedWalletClient = createExtendedWalletClient({
  name: 'BlockWallet',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.BlockWallet],
  icon: walletIcons.blockwallet,
});

const binance: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Binance',
  installed: () => (window as any).BinanceChain,
  icon: walletIcons.binance,
  provider: (window as any).BinanceChain,
});

const coinbase: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Coinbase',
  installed: () => (window as any).coinbaseWalletExtension,
  icon: walletIcons.coinbase,
  provider: (window as any).coinbaseWalletExtension,
});

const trust: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Trust',
  installed: () => (window as any).trustWallet,
  icon: walletIcons.trust,
  provider: (window as any).trustWallet,
});

const status: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Status',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.Status],
  icon: walletIcons.status,
});

const alphawallet: ExtendedWalletClient = createExtendedWalletClient({
  name: 'AlphaWallet',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.AlphaWallet],
  icon: walletIcons.alphawallet,
});

const atoken: ExtendedWalletClient = createExtendedWalletClient({
  name: 'AToken',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.AToken],
  icon: walletIcons.atoken,
});

const apex: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Apex ExtendedWalletClient',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.ApexWallet],
  icon: walletIcons.placeholder,
});

const bitpie: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Bitpie',
  installed: () => (window as any).ethereum?.Bitpie,
  icon: walletIcons.bitpie,
});

const dcent: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Dcent',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.Dcent],
  icon: walletIcons.dcent,
});

const frame: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Frame',
  installed: () => (window as any).frame,
  icon: walletIcons.frame,
  provider: (window as any).frame,
});

const huobiwallet: ExtendedWalletClient = createExtendedWalletClient({
  name: 'HuobiWallet',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.HuobiWallet],
  icon: walletIcons.huobiwallet,
});

const hyperpay: ExtendedWalletClient = createExtendedWalletClient({
  name: 'HyperPay',
  // Note: The property `hiWallet` is as of now the only known way of identifying hyperpay
  // wallet as it is a direct clone of metamask. `checkProviderIdentity` implementation is subject to
  // future changes
  installed: () => (window as any).ethereum?.hiWallet,
  icon: walletIcons.hyperpay,
});

const imtoken: ExtendedWalletClient = createExtendedWalletClient({
  name: 'ImToken',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.ImToken],
  icon: walletIcons.imtoken,
});

const liquality: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Liquality',
  installed: () => (window as any).liquality,
  icon: walletIcons.liquality,
  provider: (window as any).liquality,
});

const meetone: ExtendedWalletClient = createExtendedWalletClient({
  name: 'MeetOne',
  installed: () =>
    (window as any).ethereum?.[ProviderIdentityFlag.MeetOne] === 'MEETONE',
  icon: walletIcons.meetone,
});

const mykey: ExtendedWalletClient = createExtendedWalletClient({
  name: 'MyKey',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.MyKey],
  icon: walletIcons.mykey,
});

const ownbit: ExtendedWalletClient = createExtendedWalletClient({
  name: 'OwnBit',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.OwnBit],
  icon: walletIcons.ownbit,
});

const tokenpocket: ExtendedWalletClient = createExtendedWalletClient({
  name: 'TokenPocket',
  installed: () =>
    (window as any).ethereum?.[ProviderIdentityFlag.TokenPocket] &&
    !(window as any).ethereum?.[ProviderIdentityFlag.TP],
  icon: walletIcons.tokenpocket,
});

const xdefi: ExtendedWalletClient = createExtendedWalletClient({
  name: 'XDEFI',
  // eslint-disable-next-line dot-notation
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.XDEFI],
  icon: walletIcons.xdefi,
});

const oneInch: ExtendedWalletClient = createExtendedWalletClient({
  name: 'OneInch',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.OneInch],
  icon: walletIcons.oneInch,
});

const tokenary: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Tokenary',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.Tokenary],
  icon: walletIcons.tokenary,
});

const exodus: ExtendedWalletClient = createExtendedWalletClient({
  name: 'Exodus',
  installed: () => (window as any).ethereum?.[ProviderIdentityFlag.Exodus],
  icon: walletIcons.exodus,
});

export const supportedWallets = [
  defaultWallet,
  metamask,
  walletConnect,
  tallyho,
  binance,
  frontier,
  coinbase,
  trust,
  status,
  alphawallet,
  atoken,
  blockWallet,
  bitpie,
  brave,
  apex,
  dcent,
  frame,
  huobiwallet,
  hyperpay,
  imtoken,
  liquality,
  meetone,
  mykey,
  ownbit,
  tokenpocket,
  xdefi,
  oneInch,
  tokenary,
  mathWallet,
  exodus,
];
