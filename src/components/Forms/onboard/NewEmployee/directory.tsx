import { Start, New, Address, Restore, Wallet, Complete } from './steps';

interface IStepDir {
  [index: string]: (props: any) => JSX.Element;
}

const directory: IStepDir = {
  start: Start,
  wallet: Wallet,
  new: New,
  address: Address,
  restore: Restore,
  complete: Complete,
};

const steps = Object.keys(directory);

export { steps, directory };
