import {
  Wallet,
  convertHexToString,
  convertStringToHex,
  TrustSet,
  TrustSetFlags,
  Client,
} from 'xrpl';
import { currencyHexToUTF8, currencyUTF8ToHex } from './hexConversion';

const trustline = async (api: Client, key: string, issuer: string, code: string, limit: string) => {
  try {
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

export default trustline;
