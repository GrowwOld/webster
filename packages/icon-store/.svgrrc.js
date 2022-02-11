module.exports = {
    template: require('./scripts/helpers/template'),
    indexTemplate: require('./scripts/helpers/indexTemplate'),
    dimensions: false,
    svgoConfig: {
        "plugins": [
          {
            "name": "preset-default",
            "params": {
              "overrides": {
                "removeDimensions": false,
              }
            }
          }
        ]
    }
}