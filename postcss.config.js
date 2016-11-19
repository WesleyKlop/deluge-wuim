const nested = require('postcss-nested')
const flexbugsFixes = require('postcss-flexbugs-fixes')
const cssnext = require('postcss-cssnext')

module.exports = {
  plugins: [
    nested,
    flexbugsFixes,
    cssnext,
  ],
}
