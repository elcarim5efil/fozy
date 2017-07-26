module.exports = {
    "extends": "airbnb-base",
    globals: {
        fozy: true,
        require: true
    },
    "env": {
        "es6": true,
        "node": true
    },
    "rules": {
        "no-bitwise": [
            "error",
            {
                "allow": ["~"]
            }
        ],
        "global-require": [
          "off"
        ],
        "class-methods-use-this": [
          "warn"
      ],
        'no-param-reassign': ["error", { "props": false }]
    }
};