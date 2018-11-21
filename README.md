# XXXVogue

Website built on top of React.js framework and its ecosystem.

## Status

_In development…_

## Sub-systems

- [Server-Side Rendering service](ssr/)

## Usage

Keep in mind that front-end depends on SSR because SSR proxying requests to the backend
(it also rearranges and filtering huge amounts of data, because backend designed that way).
So you just need to start both front-end development server and SSR service in parallel.

1. Start SSR:

   ```bash
   npm run start-ssr
   ```

2. Start front-end development server:

   ```bash
   npm start
   ```
