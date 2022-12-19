import type { AppRouter } from '@/api/trpc/router';
import { createReactQueryHooks } from '@trpc/react';
import type { inferProcedureOutput, inferProcedureInput } from '@trpc/server';

//export const trpc = createReactQueryHooks<AppRouter>();

/**
 * These are helper types to infer the input and output of query resolvers
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<TRouteKey extends keyof AppRouter['_def']['queries']> =
  inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferQueryInput<TRouteKey extends keyof AppRouter['_def']['queries']> =
  inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferMutationOutput<TRouteKey extends keyof AppRouter['_def']['mutations']> =
  inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>;

export type inferMutationInput<TRouteKey extends keyof AppRouter['_def']['mutations']> =
  inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>;

import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: true,
});
// => { useQuery: ..., useMutation: ...}
