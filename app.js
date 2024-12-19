const express = require('express');
const execCommand = require('child_process').exec;
const cors = require('cors');
const nfs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/reboot', (req, res) => {
	// execCommand('sudo reboot', err => {
	// 	if (err) {
	// 		console.error(err)
	// 		res.status(500).send('Could not reboot. Please power cycle the HomeHub.')
	// 	}

	// 	res.status(200).send('Rebooting the HomeHub...')
	// });
	res.status(200).send(`Rebooting the HomeHub...`)
});
app.post('/api/update', (req, res) => {
	// nfs.writeFile('./config/settings.json', JSON.stringify(req.body, null, "  "), err => {
	// 	if (err) {
	// 		console.error(err)
	// 		res.status(500).send('Could not save sites.')
	// 	}
	// });
	res.status(200).send('Settings saved.')
});

app.listen(80, console.error);
