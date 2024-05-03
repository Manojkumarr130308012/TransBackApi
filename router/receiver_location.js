const router = require('express').Router();
const receiverlocationController = require('../controller/receiver_location');


router.post('/add', async (req, res) => {
    res.send(await receiverlocationController.add(req.body));
});
router.get('/location', async (req, res) => {
    res.send(await receiverlocationController.fetch());
});
router.get('/fetchlocation', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await receiverlocationController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await receiverlocationController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await receiverlocationController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;