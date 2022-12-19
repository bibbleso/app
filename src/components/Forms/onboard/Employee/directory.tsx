import { New, Address, Restore, Start, Complete, Login } from './steps';

interface IStepDir {
  [index: string]: (props: any) => JSX.Element;
}

const directory: IStepDir = {
  start: Start,
  new: New,
  address: Address,
  restore: Restore,
  complete: Complete,
  login: Login,
};

const steps = Object.keys(directory);

export { steps, directory };
