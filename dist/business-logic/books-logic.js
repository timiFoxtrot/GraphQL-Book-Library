import { UserModel } from "../models/userModel";
import { BookModel } from "../models/bookModel";
import { GraphQLError } from "graphql";
const graphQlError = (message) => {
    throw new GraphQLError(message, {
        extensions: {
            code: "BAD_USER_INPUT",
        },
    });
};
//////////
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
//////////
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
//////////
export const getBooks = async () => {
    const books = await BookModel.find();
    return books;
};
//////////
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
//////////
export const editBook = async ({ _id, title, author, datePublished, description, pageCount, genre, publisher, }) => {
    try {
        const update = {
            title: title,
            author,
            datePublished,
            description,
            pageCount,
            genre,
            publisher,
        };
        // const checkUpdate = {};
        // for (const key in update) {
        //   if (update[key] !== null) {
        //     checkUpdate[key] = update[key];
        //   }
        // }
        const editedBook = await BookModel.updateOne({ _id }, update);
        return editedBook.modifiedCount;
    }
    catch (error) {
        return error;
    }
};
//////////
export const removeBook = async (id) => {
    try {
        const book = await BookModel.findById(id);
        if (!book) {
            graphQlError("Book not found");
        }
        const check = await BookModel.findByIdAndDelete(id);
        console.log(check);
        return { message: "Book deleted successfully" };
    }
    catch (error) {
        return error;
    }
};
