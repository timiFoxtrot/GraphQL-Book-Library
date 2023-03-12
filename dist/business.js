import { comparePassWord, decode, genToken, hashPassword } from "./helper";
import { BookModel, UserModel } from "./model";
import { GraphQLError } from "graphql";
const graphQlError = (message) => {
    throw new GraphQLError(message, {
        extensions: {
            code: "BAD_USER_INPUT",
        },
    });
};
export const getUser = async (token) => {
    const { id } = decode(token);
    const user = await UserModel.findById(id);
    return user;
};
//Books handlers
export const insertBook = async ({ title, author, datePublished, pageCount, genre, publisher, userId, description, }) => {
    try {
        const isTitleExist = await BookModel.findOne({ title });
        if (isTitleExist) {
            graphQlError("Duplicate title");
        }
        const newBook = await BookModel.create({
            title,
            author,
            datePublished,
            pageCount,
            genre,
            publisher,
            userId,
            description,
        });
        return newBook;
    }
    catch (error) {
        return error;
    }
};
//
export const getBook = async (id) => {
    try {
        const book = await BookModel.findById(id);
        if (!book) {
            graphQlError("Book not found");
        }
        return book;
    }
    catch (error) {
        return error;
    }
};
``;
//
export const getBooks = async () => {
    const books = await BookModel.find();
    return books;
};
//
export const getUserBook = async (id) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            graphQlError("User not found");
        }
        const book = await BookModel.findOne({ userId: id });
        if (!book) {
            graphQlError("User has not created a book");
        }
        return book;
    }
    catch (error) {
        return error;
    }
};
//Users Handlers
export const insertUser = async ({ email, name, password }) => {
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            graphQlError("Email is already in use");
        }
        const newUser = new UserModel({
            email,
            name,
            password,
        });
        const hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;
        // const token = genToken({ email, id: newUser._id.toString() });
        // newUser.token = token;
        const res = await newUser.save();
        return res;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
//
export const getAllUsers = async () => {
    const users = await UserModel.find();
    return users;
};
//
export const getSingleUser = async (id) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            graphQlError("User not found");
        }
        return user;
    }
    catch (error) {
        return error;
    }
};
//
export const logUserIn = async ({ email, password }) => {
    try {
        const user = await UserModel.findOne({ email });
        console.log("user", user);
        if (!user) {
            graphQlError("Email does not exist. Please register");
        }
        const verifyPassword = await comparePassWord(user, password);
        console.log(verifyPassword);
        if (!verifyPassword) {
            graphQlError("Invalid Login");
        }
        const token = genToken({ email, id: user._id.toString() });
        console.log("Token", token);
        user.token = token;
        return user;
    }
    catch (error) {
        return error;
    }
};
