import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    datePublished: { type: String },
    description: { type: String, required: true },
    pageCount: { type: Number, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
    userId: { type: String },
}, {
    timestamps: true,
});
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email",
        },
    },
    password: { type: String, required: true },
    token: { type: String },
});
export const BookModel = mongoose.model("books", BookSchema);
export const UserModel = mongoose.model("user", UserSchema);
