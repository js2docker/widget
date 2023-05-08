import events from 'events';
import {
  addToActiveWallets,
  addToDeactivatedWallets,
  removeFromActiveWallets,
  removeFromDeactivatedWallets,
} from './walletPersistance';
import type { ExtendedWalletClient } from './clients/extendedClient';

export class LiFiWalletManagement extends events.EventEmitter {
  connectedWallets: ExtendedWalletClient[] = [];

  public connect = async (wallet: ExtendedWalletClient) => {
    try {
      await wallet.connect();
      this.connectedWallets.unshift(wallet);
      removeFromDeactivatedWallets({
        address: wallet.account?.address || '',
        name: wallet.name,
      });
      addToActiveWallets({
        address: wallet.account?.address || '',
        name: wallet.name,
      });
    } catch (e) {
      throw e;
    }
  };

  // public async autoConnect(wallets: ExtendedWalletClient[]) {
  //   for (const wallet of wallets) {
  //     if (wallet.autoConnect) {
  //       await wallet.autoConnect();
  //       wallet.addListener(
  //         'walletAccountChanged',
  //         this.handleAccountDataChange,
  //       );
  //       this.connectedWallets.unshift(wallet);
  //     }
  //   }
  // }

  public disconnect = async (wallet: ExtendedWalletClient) => {
    removeFromActiveWallets({
      address: wallet.account?.address || '',
      name: wallet.name,
    });
    addToDeactivatedWallets({
      address: wallet.account?.address || '',
      name: wallet.name,
    });
  };

  private handleAccountDataChange() {
    this.emit('walletChanged', this.connectedWallets);
  }
}
