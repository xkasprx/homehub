const express = require('express');
const execCommand = require('child_process').exec;
const nfs = require('fs');

const app = express();

app.use(express.static('web'));
app.use(express.json());

app.post('/update', (req, res) => {
	nfs.writeFile('./config/settings.json', JSON.stringify(req.body, null, "  "), err => {
		if (err) {
			console.error(err)
			res.status(500).send('Could not save sites.')
		}
	});

	execCommand('reboot', err => {
		if (err) {
			console.error(err)
			res.status(500).send('Could not reboot to apply sites. Retry or reboot manually.')
		}

		res.status(200).send('New sites applied; rebooting for changes to take effect...')
	});
});

app.listen(80, console.error);
