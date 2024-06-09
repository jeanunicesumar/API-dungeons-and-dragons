import dotenv from 'dotenv'
dotenv.config()

export const configServer = {
    SECRET_KEY: process.env.SECRET_KEY
}