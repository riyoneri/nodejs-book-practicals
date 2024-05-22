import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.format = function () {
  return this.toJSON({
    transform(document, returnValue) {
      delete returnValue.password;
      delete returnValue._id;

      return { ...returnValue, id: document._id.toString() };
    },
  });
};

export default mongoose.model("User", userSchema);
