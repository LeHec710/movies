import { MovieModel } from "./model.js";
import { DirectorModel } from "../directors/model.js";

export const getAllMovies = async () => {
    return await MovieModel.find().lean();
};

export const getOneMovie = async ({ id }) => {
    return await MovieModel.findOne({ _id: id }).lean();
};
export const getOneMovieByTitle = async ({ title }) => {
    return await MovieModel.findOne({ title }).lean();
};
export const getMoviesFromDirector = async ({ director }) => {
    return await MovieModel.find({ director }).lean();
};
export const getMoviesByGenre = async ({ genre }) => {
    return await MovieModel.find({ genre }).lean();
};

export const addOneMovie = async ({ title, description, year, langage, genre, director }) => {
    return await MovieModel.insertMany([{ title, description, year, langage, genre, director }]);
};

export const updateOneMovie = async ({ id, movie }) => {
    return await MovieModel.findOneAndUpdate(
        { _id: id },
        { $set: movie }
    )
};

export const removeOneMovie = async ({ id }) => {
    return await MovieModel.deleteOne({ "_id": id });
};

export const findMovies = async ({ query }) => {
    const regex = ".*" + query + ".*";

    const movies = await MovieModel.find({
        $or: [
            { title: { $regex: regex } },
            {
                $expr: {
                    $regexMatch: {
                        input: { $toString: { $year: "$year" } },
                        regex: new RegExp(query, 'i')
                    }
                }
            },
            {
                director: {
                    $in: await DirectorModel.find({
                        name: { $regex: new RegExp(query, 'i') }
                    }).distinct('_id')
                }
            }
        ],
    }).lean();

    return movies;
};
