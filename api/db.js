import mongoose from 'mongoose';

const host = "127.0.0.1"
const port = 27017
const name = "vue-td"

export const initializeMongoDatabase = async () => {
	const db = `mongodb://${host}:${port}/${name}`;
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(db);
		console.log("Database connected");
	} catch (e) {
		console.log("db error: " + e);
	}
};