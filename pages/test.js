import React from 'react'
// import { getServerSession } from 'next-auth/next'
// import { authOptions } from './api/auth/[...nextauth]'
// import { getServerAuthSession } from './api/auth/[...nextauth]'

import { useSession, signOut, signIn } from "next-auth/react"

// const Test = ({ user }) => {
const Test = () => {
  const { data, status } = useSession();

  if (status === 'loading') {
    return <h3>loading....</h3>
  }
  if (status === 'unauthorized') {
    return <h3>{status}</h3>
  }
  return (
    <div>
      <p className='text-4xl text-center mt-20 underline'>Test Page</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {data && <button className='border text-red-500 hover:text-blue-500 rounded-lg p-2' onClick={signOut}>sign out</button>}
    </div>
  )
}

export default Test


Test.auth = true;



// /** how to  be get session or current signin user inside getServerSideProps */

// /**
//  * @param {import('next').GetServerSidePropsContext} ctx 
//  */


// export async function getServerSideProps(ctx) {
//   // const session = await getServerSession(ctx.req, ctx.res, authOptions);
//   // const session = await getServerAuthSession(ctx);
//   const session = await getServerSession(ctx.req, ctx.res);

//   if (!session) {
//     return {
//       redirect: {
//         // destination: '/api/auth/signin',
//         destination: '/ ',
//         permanent: false,
//       },
//     };
//   }

//   const { user } = session;
//   const props = {
//     user: {
//       ...user,
//       image: user?.image || null, // Set image to null if it's undefined
//     },
//   };

//   return { props };
// }




