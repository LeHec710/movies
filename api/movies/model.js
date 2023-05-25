import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
	title: String,
	description: String,
	year: Date,
	langage: String,
	genre: String,
	poster: String,
	director: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

export default movieSchema
export const MovieModel = mongoose.model('Movie', movieSchema);