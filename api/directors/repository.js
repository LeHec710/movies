import { DirectorModel } from "./model.js";

export const getAllDirectors = async () => {
    return await DirectorModel.find().lean();
};

export const getOneDirector = async ({ id }) => {
    return await DirectorModel.findOne({ _id: id }).lean();
};
export const getOneDirectorByName = async ({ name }) => {
    return await DirectorModel.findOne({ name }).lean();
};

export const addOneDirector = async ({ name, birthdate, nationality }) => {
    return await DirectorModel.insertMany([{ name, birthdate, nationality }]);
};

export const updateOneDirector = async ({ id, director }) => {
    return await DirectorModel.findOneAndUpdate(
        { _id: id },
        { $set: director }
    )
};

export const removeOneDirector = async ({ id }) => {
    return await DirectorModel.deleteOne({ "_id": id });
};

export const findDirectors = async ({ query }) => {
    const re = ".*" + query + ".*";
    const directors = await DirectorModel.find({
        $or: [
            { name: { $regex: re } },
        ],
    }).lean();

    return directors;
};
