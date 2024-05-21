import mongoose, { Schema, Types } from "mongoose";

mongoose.connect("mongodb://localhost:27017/movie-db");

const movieSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  userId: { type: Types.ObjectId, required: true },
  public: { type: Boolean, required: true },
});

movieSchema.methods.format = function () {
  return this.toJSON({
    transform: (document, returnValue) => {
      delete returnValue._id;

      return { ...returnValue, id: document._id.toString() };
    },
  });
};

const Movie = mongoose.model("Movie", movieSchema);

export const getAll = async (userId, sortOrder) => {
  const movies = await Movie.find({ $or: [{ userId }, { public: true }] })
    .sort({
      _id: sortOrder || 1,
    })
    .transform((documents) =>
      documents.map((singleDocument) => singleDocument.format()),
    );

  return movies;
};

export const get = async (movieId, userId) => {
  const movie = await Movie.findOne({
    $and: [{ _id: movieId }, { $or: [{ public: true }, { userId }] }],
  });

  return movie.format();
};
