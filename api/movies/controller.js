import { Router } from 'express';
import multer from "multer";
import { uuid } from 'uuidv4';

const MIME_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpeg',
	'image/jpg': 'jpg'
};
const upload = multer({
	dest: 'uploads/posters', storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/posters');
		},
		filename: (req, file, cb) => {
			const ext = MIME_TYPE_MAP[file.mimetype];
			cb(null, uuid() + '.' + ext);
		}
	})
})

import {
	getAllMovies,
	getOneMovie,
	getOneMovieByTitle,
	getMoviesFromDirector,
	getMoviesByGenre,
	addOneMovie,
	findMovies,
	removeOneMovie,
	updateOneMovie,
} from './repository.js';

const router = Router();

// redirection
router.get('/', (req, res) => {
	res.redirect(req.originalUrl + '/getAll')
});

router.get('/getAll', async (req, res) => {
	try {
		return res.json(await getAllMovies());
	} catch {
		res.sendStatus(500);
	}
});

router.get('/get/:id', async (req, res) => {
	try {
		const id = req.params.id;
		return res.json(await getOneMovie({ id }));
	} catch {
		res.sendStatus(500)
	}
})

router.post('/get', async (req, res) => {
	const { id, title, director, genre } = req.body
	try {
		if (id) {
			return res.json(await getOneMovie({ id }));
		}
		if (title) {
			return res.json(await getOneMovieByTitle({ title }));
		}
		if (director) {
			return res.json(await getMoviesFromDirector({ director }));
		}
		if (genre) {
			return res.json(await getMoviesByGenre({ genre }));
		}
	} catch(err) {
		console.log(err)
		res.sendStatus(500)
	}
})

router.get('/find', async (req, res) => {
	try {
		const query = req.query.q;
		res.json(await findMovies({ query }));
	} catch {
		res.sendStatus(500);
	}
});

router.post('/search', async (req, res) => {
	try {
		const { query } = req.body;
		res.json(await findMovies({ query }));
	} catch {
		res.sendStatus(500);
	}
});

router.post('/poster', upload.array('poster', 12), async (req, res) => {
	try {
		const { id } = req.body;
		const movie = await updateOneMovie({ id, movie: {poster: req.files[0].filename} });
		res.status(200).send(movie);
	} catch (err) {
		console.log(err)
	}
})

router.post('/add', async (req, res) => {
	try {
		const { title, description, year, langage, genre } = req.body;
		if (!title) {
			res.status(400).send("Field 'title' must be set");
		} else if (!description) {
			res.status(400).send("Field 'description' must be set");
		} else {
			const movie = await addOneMovie({ ...req.body });
			res.status(200).send(movie);
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
			const movie = await removeOneMovie({ id });
			res.status(200).send(movie);
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
			const movies = await updateOneMovie({ id, movie: payload });
			res.status(200).send(movies);
		} else {
			res.status(400).send("Field 'id' must be set");
		}
	} catch {
		res.sendStatus(500);
	}
});

export default router;
