import Express from 'express';
import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import routes from './routes';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
const app = new Express();

app.use(compression());
app.use(favicon(path.join(__dirname, '..', '/client/img/favicon.ico')));

app.set('views', path.join(__dirname, '..', '/server/views'))
app.set('view engine', 'jade')

let webpackStats;

if (process.env.NODE_ENV === 'production') {
  webpackStats = require('../webpack-stats.json');
}

app.use(require('serve-static')(path.join(__dirname, '..', 'client')));

app.use((req, res) => {
  const location = new Location(req.path, req.query);
  if (process.env.NODE_ENV === 'development') {
    webpackStats = require('../webpack-stats.json');
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve('../webpack-stats.json')];
  }
  Router.run(routes, location, (error, initialState) => {
    if (error) {
      res.status(500).send(error);
    } else {
      Promise.all(initialState.components)
        .then(() => {
          res.render('index', {
              content: React.renderToString(<Router location={location} {...initialState}/>),
              css: webpackStats.css,
              script: webpackStats.script[0]
          })
        }).catch((err) => {
          res.status(500).send(err.stack);
        });
    }
  });
});

if (config.port) {
  app.listen(config.port, '0.0.0.0', (err) => {
    if (err) {
      console.error(err);
    } else {
        console.info('==> ✅  Server is listening');
        console.info('==> 🌎  %s running on port %s, API on port %s', config.app.name, config.port, config.apiPort);
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
