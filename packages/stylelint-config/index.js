module.exports = {
  "extends": "stylelint-config-standard",
  "plugins": [
    "stylelint-declaration-strict-value",
    "stylelint-no-unsupported-browser-features"
  ],
  "rules": {
    "declaration-no-important": [true, { "severity": "warning" }],
    "rule-empty-line-before": ["always", { "severity": "warning" }],
    "selector-id-pattern": null,
    "custom-property-pattern": null,
    "keyframes-name-pattern": null,
    "color-hex-case": ["upper", { "severity": "warning" }],
    "scale-unlimited/declaration-strict-value": [
      ["/color$/", "z-index", "background", "border"], { "severity": "warning" }
    ],
    "plugin/no-unsupported-browser-features": [true, {
      "browsers": ["> 2%"],
      "ignore": ["rem"],
      "ignorePartialSupport": true,
      "severity": "warning"
    }]
  }
}
