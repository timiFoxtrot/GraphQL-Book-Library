import { editBook, getBook, getBooks, getUserBook, insertBook, removeBook, } from "./business-logic/books-logic";
import { getAllUsers, getSingleUser, insertUser, logUserIn, } from "./business-logic/users-logic";
const resolvers = {
    Query: {
        async books(root, {}, {}) {
            const book = await getBooks();
            return book;
        },
        async book(root, { id }) {
            const book = await getBook(id);
            return book;
        },
        async users(root, {}, {}) {
            const users = await getAllUsers();
            return users;
        },
        async user(root, { id }, {}) {
            const user = await getSingleUser(id);
            return user;
        },
        async bookByUser(root, { userId }, {}) {
            const book = await getUserBook(userId);
            return book;
        },
    },
    Mutation: {
        async createBook(root, { title, author, pageCount, genre, publisher, description }, context) {
            if (!context.user) {
                return null;
            }
            const newBook = await insertBook({
                title,
                author,
                datePublished: new Date(),
                pageCount,
                genre,
                publisher,
                userId: context.user._id,
                description,
            });
            return newBook;
        },
        async updateBook(root, { _id, title, author, datePublished, description, pageCount, genre, publisher, }) {
            const updatedBook = await editBook({
                _id,
                title,
                author,
                datePublished,
                description,
                pageCount,
                genre,
                publisher,
            });
            return updatedBook;
        },
        async deleteBook(root, { _id }) {
            return removeBook(_id);
        },
        async createUser(root, { email, name, password }) {
            const newUser = await insertUser({ email, name, password });
            return newUser;
        },
        async loginUser(root, { email, password }, {}) {
            const user = await logUserIn({ email, password });
            return user;
        },
    },
};
export default resolvers;
