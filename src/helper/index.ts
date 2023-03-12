import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

type JsonPayload = {
  email:string
  id:string
}
// const secret = 'secret'
export const genToken = ({email, id}: JsonPayload) => {
  const token = jwt.sign({email, id}, 'secret', {expiresIn: '1d'})
  return token
}

export const decode = (token: string) => {
  const decoded = jwt.verify(token, 'secret') as JsonPayload
  return decoded
}

export const hashPassword = async (password: string) => {
  const saltFactor: any = process.env.SALTFACTOR || 10
  const salt = await bcrypt.genSalt(saltFactor);
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

export const comparePassWord = async (user, password: string) => {
  const isMatch = await bcrypt.compare(password, user.password)
  return isMatch
}