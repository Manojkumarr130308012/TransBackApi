const router = require('express').Router();
const senderlocationController = require('../controller/sender_location');


router.post('/add', async (req, res) => {
    res.send(await senderlocationController.add(req.body));
});
router.get('/sender_location', async (req, res) => {
    res.send(await senderlocationController.fetch());
});
router.get('/sender_fetch_location', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await senderlocationController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await senderlocationController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await senderlocationController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;