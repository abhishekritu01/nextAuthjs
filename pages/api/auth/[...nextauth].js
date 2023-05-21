// import NextAuth from "next-auth";
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: '994772784562-1ghg41l33s60krhs2ernafet0iraq3sp.apps.googleusercontent.com',
//             clientSecret: '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',
//         }),
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' }
//             },
//             async authorize(credentials, req) {
//                 console.log(credentials);
//                 const { email, password } = credentials;
//                 /** validate the username and password */
//                 const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
//                 if (user) {
//                     return user
//                 } else {
//                     return null
//                 }

//                 // const isValidationFailed = true;
//                 // if (isValidationFailed) {
//                 //     throw new Error('Email password invalid')
//                 // }

//             },
//         })
//     ],
//     secret: 'bYNk2DUmyqYuzdHKdX+T4MzbuZFAGVldlxLgovl9aQE='
// });


//----------------------------------------------------------

// import NextAuth, { getServerSession } from "next-auth";
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from '@next-auth/prisma-adapter'

// import { prisma } from "@/lib/prismaClient";

// const adapter = PrismaAdapter(prisma)


// const authOptions = {
//     adapter: adapter,
//     providers: [
//         GoogleProvider({
//             clientId: '994772784562-1ghg41l33s60krhs2ernafet0iraq3sp.apps.googleusercontent.com',
//             clientSecret: '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',
//         }),
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' }
//             },
//             async authorize(credentials, req) {
//                 console.log(credentials);
//                 const { email, password } = credentials;
//                 /** validate the username and password */
//                 const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
//                 if (user) {
//                     return user
//                 } else {
//                     return null
//                 }

//                 // const isValidationFailed = true;
//                 // if (isValidationFailed) {
//                 //     throw new Error('Email password invalid')
//                 // }

//             },
//         })
//     ],
//     secret: 'bYNk2DUmyqYuzdHKdX+T4MzbuZFAGVldlxLgovl9aQE='
// }

// export default NextAuth(authOptions);

// // export const getServerAuthSession = ctx => {
// //     return getServerSession(ctx.req, ctx.res, authOptions)
// // }
// export const getServerAuthSession = (req, res) => {
//     return getServerSession(req, res, authOptions)
// }



//===================
import NextAuth, { getSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";



import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@prisma/client";
import { prisma } from "@/lib/prismaClient";
const adapter = PrismaAdapter(prisma)
console.log("prisma", prisma)

const authOptions = {
    adapter: adapter,

    providers: [
        GoogleProvider({
            clientId: '994772784562-1ghg41l33s60krhs2ernafet0iraq3sp.apps.googleusercontent.com',
            clientSecret: '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',
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                console.log(credentials);
                const { email, password } = credentials;
                /** validate the username and password */
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                if (user) {
                    return Promise.resolve(user);
                } else {
                    return Promise.resolve(null);
                }

                // Alternatively, you can throw an error if authentication fails:
                // throw new Error('Email or password is invalid');
            },
        })
    ],
    secret: 'bYNk2DUmyqYuzdHKdX+T4MzbuZFAGVldlxLgovl9aQE=',

}

export default NextAuth(authOptions);

export const getServerAuthSession = (req, res) => {
    return getSession({ req, res });
}
