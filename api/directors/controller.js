import { Router } from 'express';

import {
	getAllDirectors,
	getOneDirector,
	getOneDirectorByName,
	addOneDirector,
	findDirectors,
	removeOneDirector,
	updateOneDirector,
} from './repository.js';

const router = Router();

// redirection
router.get('/', (req, res) => {
	res.redirect(req.originalUrl + '/getAll')
});

router.get('/getAll', async (req, res) => {
	try {
		return res.json(await getAllDirectors());
	} catch {
		res.sendStatus(500);
	}
});

router.get('/get/:id', async (req, res) => {
	try {
		const id = req.params.id;
		return res.json(await getOneDirector({ id }));
	} catch {
		res.sendStatus(500)
	}
})

router.post('/get', async (req, res) => {
	const {id, name} = req.body
	try {
		if(id) {
			return res.json(await getOneDirector({ id }));
		}
		if(name) {
			return res.json(await getOneDirectorByName({ name }));
		}
	} catch {
		res.sendStatus(500)
	}
})

router.get('/find', async (req, res) => {
	try {
		const query = req.query.q;
		res.json(await findDirectors({ query }));
	} catch(err) {
		console.log(err)
		res.sendStatus(500);
	}
});

router.post('/add', async (req, res) => {
	try {
		const { name, birthdate, nationality } = req.body;
		if (!name) {
			res.status(400).send("Field 'name' must be set");
		} else {
			const director = await addOneDirector({ ...req.body });
			res.status(200).send(director);
		}
	} catch (err) {
		console.log(err)
		res.sendStatus(500); 
	}
});

router.post('/delete', async (req, res) => {
	try {
		const { id } = req.body;
		if (id) {
			const director = await removeOneDirector({ id });
			res.status(200).send(director);
		} else {
			res.status(400).send("Field 'id' must be set");
		}
	} catch {
		res.sendStatus(500);
	}
});

router.post('/update', async (req, res) => {
	try {
		const { id, payload } = req.body;
		if (id) {
            const directors = await updateOneDirector({ id, director: payload });
			res.status(200).send(directors);
		} else {
			res.status(400).send("Field 'id' must be set");
		}
	} catch(err) {
		console.log(err)
		res.sendStatus(500);
	}
});

export default router;
