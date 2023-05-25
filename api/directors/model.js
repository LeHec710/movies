import mongoose from 'mongoose';
const directorSchema = new mongoose.Schema({
	name: String,
	nationality: String,
	birthdate: Date,
	films: Array
}, { timestamps: true });

directorSchema.pre('save', async function () {
    // this.films = await MovieModel.findByDirector(this._id);
});

export default directorSchema
export const DirectorModel = mongoose.model('Director', directorSchema);