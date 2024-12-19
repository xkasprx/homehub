module.exports = {
  apps : [{
    name: `HomeHub`,
    script: `serve -s build`,
    watch: true,
    env: {
      NODE_ENV: `production`,
    },
  }],
};