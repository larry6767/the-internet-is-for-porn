# Server-Side Rendering

`ssr` is an acronym for __Server-Side Rendering__.

_P.S. You supposed to be inside a site directory
(like this one: [`sites/videosection/`](../sites/videosection/))
before running commands shown below._

## Usage

To start HTTP-server on `http://127.0.0.1:8001` use this command:

```bash
make start-ssr
```

To customize port or/and host use command-line arguments:

```bash
make ARGS='--port=8111 --host=0.0.0.0' start-ssr
```

To run production build (produced by `npm run build`) without watcher:

```bash
make start-production-ssr
```

### Available command-line options

Use them by passing in `ARGS` variable to `make` command, like:

```bash
make ARGS='--port=8123' start-ssr
```
or:
```bash
make ARGS='--port=8123' start-production-ssr
```

- `--port=8001`
- `--host=127.0.0.1`
- `--production`
- `--rc`

### All steps to deploy and run production service

```bash
(cd ../../ && npm i)
make start-production-ssr
```

It will start HTTP server on `http://127.0.0.1:8001` and you could proxy it with __nginx__ or other
HTTP(S) endpoint server.

#### Release Candidate server

To run RC server with proper `robots.txt` file (to prevent search engines from indexing it):

```bash
make ARGS='--rc' start-production-ssr
```

#### Many workers

You probably wish to start few workers in parallel and balance requests between them.
To do so you could just start them on different ports like this:

```bash
make ARGS='--port=9001' start-production-ssr &
make ARGS='--port=9002' start-production-ssr &
make ARGS='--port=9003' start-production-ssr &
make ARGS='--port=9004' start-production-ssr &
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

#### Serving static files by __nginx__

_P.S. `$dir` is for the Video Section site, change it for specific site._

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

    set $dir '/home/videosectionssr/project/the-internet-is-for-porn/sites/videosection';

    # For production
    location /robots.txt { alias $dir/robots/production/robots.txt; }
    # Or use this instead if it's running on Release Candidate/testing server
    # (to prevent search engines from indexing it).
    #location /robots.txt { alias $dir/robots/rc/robots.txt; }

    location /favicon.ico { alias $dir/build/$uri; }
    location /manifest.json { alias $dir/build/$uri; }
    location ^~ /img/ { root $dir/build/; }
    location ^~ /static/js/ { root $dir/build/; }
}
```
