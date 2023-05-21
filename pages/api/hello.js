// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }


//-----------------------
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getServerAuthSession } from "./auth/[...nextauth]"

export default async function handler(req, res) {

  const session = await getServerAuthSession(req, res)
  if (!session) {
    // throw new Error('Unauthorized ')
    res.status(401).json({ message: 'Unauthorized' })

  }
  res.status(200).json({ name: 'John Doe' })
}
