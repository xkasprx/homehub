const exp = require('express')
const exe = require('child_process').exec
const nfs = require('fs')

const app = exp()

app.use(exp.static('web'))
app.use(exp.json())

app.get('/sites', (req, res) => {
  res.sendFile(__dirname + '/config/settings.json')
})

app.post('/sites', (req, res) => {
  nfs.writeFile('./config/settings.json', JSON.stringify(req.body, null, "  "), err => {
	if (err) {
	  console.error(err)
	  res.status(500).send('Could not save sites.')
	}
	exe('reboot', err => {
	  if (err) {
		console.error(err)
		res.status(500).send('Could not reboot to apply sites. Retry or reboot manually.')
	  }
	  res.status(200).send('New sites applied; rebooting for changes to take effect...')
	})
  })
})

app.listen(80, console.error)
