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

#### Many workers

You probably wish to start few workers in parallel and balance requests between them.
To do so you could just start them on different ports like this:

```bash
npm run start-production-ssr -- --port=9001 &
npm run start-production-ssr -- --port=9002 &
npm run start-production-ssr -- --port=9003 &
npm run start-production-ssr -- --port=9004 &
```

And patch your __nginx__ config relying on this example:

```nginx
http {
    upstream ssr_workers {
        server 127.0.0.1:9001;
        server 127.0.0.1:9002;
        server 127.0.0.1:9003;
        server 127.0.0.1:9004;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://ssr_workers;
            proxy_set_header X-Forwarded-For $remote_addr;
            proxy_set_header Host $http_host;
        }
    }
}
```

P.S. You might need to set some __SELinux__ flags to make it work, such as these
(__please make sure you clearly understand security risks while doing this__):

```bash
setsebool -P httpd_can_network_connect 1
```
