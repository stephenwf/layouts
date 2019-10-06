import { useCustomContext } from './use-custom-context';

export const useGlobalContext = <T extends any>(
  context: T,
  deps: any[] = [],
  resetContext?: (ctx: T) => void
) => {
  useCustomContext(context, undefined, deps, resetContext);
};
