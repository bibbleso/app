import { encrypt, decrypt } from './crypto';

export const removeFromChain = async (address: string, chain: string) => {
  try {
    let mapChain: Map<string, string> = parseKeychain(chain);
    if (mapChain.size === 0 || !chain) throw 'Chain not found';
    mapChain.delete(address);
    return stringifyKeychain(mapChain);
  } catch (err: any) {
    return err;
  }
};

export const rekeyChain = async (newSecret: string, oldSecret: string, chain: string) => {
  let mapChain: Map<string, string> = parseKeychain(chain);
  if (mapChain.size === 0 || !chain) throw 'Chain not found';
  let map = new Map();
  for (let entry of mapChain.entries()) {
    map.set(entry[0], encrypt(decrypt(entry[1], oldSecret), newSecret));
  }
  return stringifyKeychain(map);
};

export const addToChain = async (
  address: string,
  secret: string,
  item: Map<string, string>,
  chain: string
) => {
  try {
    let mapChain: Map<string, string> = parseKeychain(chain);
    let key: string | undefined = item.get(address);
    if (!key) throw 'Key not found';
    let cipher = encrypt(key, secret);
    let map = new Map();
    for (let entry of mapChain.entries()) {
      map.set(entry[0], entry[1]);
    }
    if (map.has(address)) throw 'Key already exists on keychain';
    map.set(address, cipher);
    return stringifyKeychain(map);
  } catch (err: any) {
    return err;
  }
};

export const getSignKey = async (address: string, secret: string, chain: string) => {
  try {
    let mapChain: Map<string, string> = parseKeychain(chain);
    if (mapChain.size === 0 || !chain) throw 'Chain not found';
    let cipher: string | undefined = mapChain.get(address);
    if (!cipher) throw 'Cipher not found';
    return decrypt(cipher, secret);
  } catch (err: any) {
    return err;
  }
};

export const parseKeychain = (chain: string): Map<string, string> => {
  try {
    return new Map(JSON.parse(chain));
  } catch (err: any) {
    return err;
  }
};

export const stringifyKeychain = (chain: Map<string, string>): string => {
  try {
    return JSON.stringify(Array.from(chain.entries()));
  } catch (err: any) {
    return err;
  }
};
