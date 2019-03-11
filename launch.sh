#!/usr/bin/env bash
# A wrapper around `npm run start-production-ssr` which uses `node` provided by `nvm`.

cd -- "$(dirname -- "${BASH_SOURCE[0]}")"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

make ARGS="$*" start-production-ssr
