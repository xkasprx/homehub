module.exports = {
  apps : [{
    name: `HomeHub API`,
    script: `app.js`,
    watch: true,
    time: true,
    env: {
      NODE_ENV: `production`,
    },
  }],
};