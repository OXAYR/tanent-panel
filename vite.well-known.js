const DEVTOOLS_WELL_KNOWN_PATH = '/.well-known/appspecific/com.chrome.devtools.json';

/** Chrome DevTools probes this URL; respond before React Router SSR to avoid console noise. */
export function wellKnownDevToolsPlugin() {
  return {
    name: 'well-known-devtools',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0];
        if (path === DEVTOOLS_WELL_KNOWN_PATH) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end('{}');
          return;
        }
        next();
      });
    },
  };
}
