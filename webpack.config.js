const path = require('path');

module.exports = {
  "entry": path.resolve(__dirname, 'webApp') + '/js/index.jsx',
  "output": {
    "path": path.join(__dirname, '/webApp/static/js/'),
    "filename": 'bundle.js',
  },
  "module": {
    "rules": [
        {
            "test": /\.(js|jsx)$/,
            "exclude": /node_modules/,
            "use": {
                "loader": "babel-loader",
                "options": {
                    "presets": [
                        "@babel/env",
                        "@babel/react"
                    ]
                }
            }
        }
    ]
}
}
