# Server-Side Rendering

`ssr` is an acronym for __Server-Side Rendering__.

## Usage

To start HTTP-server on `http://127.0.0.1:8001` use this command:

```bash
npm run start-ssr
```

To customize port or/and host use command-line arguments:

```bash
npm run start-ssr -- --port=8111 --host=0.0.0.0
```

To run production build (produced by `npm run build`) without watcher:

```bash
npm run start-production-ssr
```

### Available command-line options

Use them after `--` separator given to `npm run ...`, like:

```bash
npm run start-ssr -- --port=8123
```
or:
```bash
npm run start-production-ssr -- --port=8123
```

- `--port=8001`
- `--host=127.0.0.1`
- `--production`

### All steps to deploy and run production service

```bash
npm i
npm run build
npm run start-production-ssr
```

It will start HTTP server on `http://127.0.0.1:8001` and you could proxy it with __nginx__ or other
HTTP(S) endpoint server.
