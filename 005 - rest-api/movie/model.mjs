import mongoose, { Schema, Types } from "mongoose";

mongoose.connect("mongodb://localhost:27017/movie-db");

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    userId: { type: Types.ObjectId, required: true },
    public: { type: Boolean, required: true },
  },
  {
    versionKey: false,
    toJSON: {
      transform: (document, returnValue) => {
        delete returnValue._id;

        return { ...returnValue, id: document._id.toString() };
      },
    },
  },
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;

export const get = async (movieId, userId) => {
  const movie = await Movie.findOne({
    $and: [{ _id: movieId }, { $or: [{ public: true }, { userId }] }],
  });

  return movie.toJSON();
};
