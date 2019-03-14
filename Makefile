BINDIR = ../../node_modules/.bin
SITE_DIR_REG = /sites/[a-z0-9-]\+/\?$
NODE_PATH = NODE_PATH=.

build-prod-bundle: validate-site-directory
	rm -f src/dev-modules
	(cd src/ && ln -s ../dev-modules/production/ dev-modules)
	env SKIP_PREFLIGHT_CHECK=true $(NODE_PATH) "$(BINDIR)/react-scripts" build
	rm -f src/dev-modules
	(cd src/ && ln -s ../dev-modules/development/ dev-modules)

start-dev-server: validate-site-directory
	env SKIP_PREFLIGHT_CHECK=true $(NODE_PATH) $(BINDIR)/react-scripts start

start-ssr: validate-site-directory
	env $(NODE_PATH) "$(BINDIR)/nodemon" --watch src/ --watch ssr/ ssr/index.jsx --exec "$(BINDIR)/babel-node" --presets es2015,stage-2,react -- $(ARGS)

start-production-ssr: validate-site-directory
	env $(NODE_PATH) NODE_ENV=production "$(BINDIR)/babel-node" ssr/index.jsx --presets es2015,stage-2,react --production $(ARGS)

validate-site-directory:
	pwd | grep "$(SITE_DIR_REG)" 1>/dev/null || (echo You are supposed to run make tasks being insite a site directory! 1>&2 && exit 1)

validate-not-site-directory:
	pwd | grep -v "$(SITE_DIR_REG)" 1>/dev/null || (echo You are not supposed to run npm commands being in a site directory! 1>&2 && exit 1)
