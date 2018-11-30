# XXXVogue

Website built on top of React.js framework and its ecosystem.

## Status

_In development…_

## Sub-systems

- [Server-Side Rendering service](ssr/)

## Recommended working environment

```bash
node --version # v10.14.1
npm --version # 6.4.1
```

Which are obtained by using `nvm`:

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
exec bash
nvm install --lts
```

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

### Production

An example of systemd-service (`/etc/systemd/system/ssrworker@.service`):

```systemd
[Unit]
Description=SSR Worker - Node.js based Servers-Side-Rendering service [ worker port: %I ]
After=multi-user.target

[Service]
WorkingDirectory=/home/videosectionssr/project/xxxvogue
Type=simple

ExecStart=/bin/bash ./launch.sh --port=%i
#Restart=on-failure

StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=ssrworker

User=videosectionssr
Group=videosectionssr


[Install]
WantedBy=multi-user.target
```

To add workers aliased to specific ports (9001–9004):

```bash
cd /etc/systemd/system/multi-user.target.wants/
ln -s /etc/systemd/system/ssrworker@.service ssrworker@9001.service
ln -s /etc/systemd/system/ssrworker@.service ssrworker@9002.service
ln -s /etc/systemd/system/ssrworker@.service ssrworker@9003.service
ln -s /etc/systemd/system/ssrworker@.service ssrworker@9004.service
```

To restart all workers:

```bash
systemctl restart ssrworker@900*
```

To see if all of them working:

```bash
systemctl status ssrworker@900*
```
