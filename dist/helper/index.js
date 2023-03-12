import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// const secret = 'secret'
export const genToken = ({ email, id }) => {
    const token = jwt.sign({ email, id }, 'secret', { expiresIn: '1d' });
    return token;
};
export const decode = (token) => {
    const decoded = jwt.verify(token, 'secret');
    return decoded;
};
export const hashPassword = async (password) => {
    const saltFactor = process.env.SALTFACTOR || 10;
    const salt = await bcrypt.genSalt(saltFactor);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
export const comparePassWord = async (user, password) => {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
};
