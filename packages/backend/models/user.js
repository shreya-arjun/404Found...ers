import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({});

const userModel = mongoose.model("User", UserSchema);

export default userModel;