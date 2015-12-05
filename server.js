var http = require('http');
var express = require('express');
var React = require('react');
var Index = require('./src/index');
var cookieParse = require('cookie-parser');
var path = require('path');
var fs = require('fs');
var Router = require('react-router');
var Location = require('react-router/lib/Location');
var Provider = require('react-redux');
var routes = require('./src/containers');
var createRedux = require('./src/store/configureStore');
var stringifyLocation = require('./src/utils/stringifyLocation');

var env = process.env.NODE_ENV || 'development';
var app = express();

app.use(cookieParser());
app.use(express.static('public'));

app.use(require('morgan')('short'));

var templatePath = path.join(__dirname, 'template.html');
var templateSource = fs.readFileSync(templatePath, { encoding: 'utf-8' });
var template = _.template(templateSource);

app.use(function(req, res, next) {
  var location = new Location(req.path, req.query);
  var store = createRedux();

  React.render()
  Router.run(routes(store, false), location, function(err, state, transition) {
    if (err) { return next(err); }

    // var { isCancelled, redirectInfo } = transition.isCancelled;

    // if (isCancelled) {
    //   return res.redirect(stringifyLocation(redirectInfo));
    // }

    // await fillStore(store, state, state.components);

    var html = React.renderComponentToString(
      <Provider store={store}>
        {function () { <Router {...state} />}}
      </Provider>
    );

    var initialState = JSON.stringify(store.getState());

    if (state.params.splat) {
      res.status(404);
    }

    res.send(template({ html: html, initialState: initialState, env: env }));
  });
});

(function initWebpack() {
  var webpack = require('webpack');
  var webpackConfig = require('./webpack/dev.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(__dirname + '/'));
})();

var React.renderComponentToString(
  Index({

  })
);

app.get('/', function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});

if (require.main === module) {
  var server = http.createServer(app);
  server.listen(process.env.PORT || 3000, function onListen() {
    var address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
  });
}
