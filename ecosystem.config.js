module.exports = {
  apps : [{
    name: `HomeHub`,
    script: `./app.js`,
    watch: true,
    time: true,
    env: {
      NODE_ENV: `production`,
    },
  }],
};