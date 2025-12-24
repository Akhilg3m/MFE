const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "vehicleMfe": "http://localhost:4201/remoteEntry.js",
    "paymentMfe": "http://localhost:4202/remoteEntry.js",
  },

  shared: {
    '@angular/core': { singleton: true, strictVersion: true },
    '@angular/common': { singleton: true, strictVersion: true },
    '@angular/router': { singleton: true, strictVersion: true },
  },

});
