// import '@/styles/globals.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

//------------
import '@/styles/globals.css'

import { SessionProvider } from "next-auth/react"
import { CredentialsProvider } from 'next-auth/providers/credentials'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'


export default function App({ Component, pageProps: { session, ...pageProps } }) {

  console.log('Component.auth', Component.auth)
  return (
    <SessionProvider session={session}>
      {Component.auth ?
        (<Auth>
          <Component {...pageProps} />
        </Auth>) : (<Component {...pageProps} />)}


    </SessionProvider>
  )
}


function Auth({ children }) {

  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user
  const loading = status === 'loading'

  useEffect(() => {
    if (!loading) {
      if (!isUser) {
        router.push('/api/auth/signin')
      }
    }
  }, [isUser, loading])

  if (loading) {
    return <h3>loading...</h3>
  }


  if (!loading && isUser) {
    return <>{children}</>
  }

  return null;



  // return <div>
  //   Authenticated page
  //   {children}
  // </div>
}