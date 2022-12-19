import {
  Wallet,
  convertHexToString,
  convertStringToHex,
  Client,
  TrustSet,
  TrustSetFlags,
} from 'xrpl';
import { currencyHexToUTF8, currencyUTF8ToHex } from './hexConversion';
import wallets from '../../../config/wallets';

const trustline = async (url: string, key: string, issuer: string, code: string, limit: string) => {
  try {
    const api = new Client(url);

    await api.connect();
    console.log('Connected');

    let signer = Wallet.fromSecret(key);

    // Create trust line from hot to cold address --------------------------------
    const currency_code = currencyUTF8ToHex(code);

    const tx: TrustSet = {
      TransactionType: 'TrustSet',
      Account: signer.classicAddress,
      LimitAmount: {
        currency: currency_code,
        issuer: issuer,
        value: limit, // Large limit, arbitrarily chosen
      },
      Flags: TrustSetFlags.tfSetNoRipple,
    };

    let opts = {
      autfill: true,
      failhard: true,
      wallet: signer,
    };

    let trustset = await api.submitAndWait(tx, opts);
    return trustset;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const main = async (wallets: any) => {
  let resp = await trustline(
    'wss://s.altnet.rippletest.net:51233',
    wallets[0].hotSecret,
    'r3QrC1z78cynREz4zvJ7UFg8k1goRf4PZV',
    'USD',
    wallets[3].limit
  );
  console.log(resp);
};

main(wallets.wallets);

export default trustline;
