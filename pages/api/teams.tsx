import { NextApiRequest, NextApiResponse } from 'next'
import { EP_TIMES } from '../../src/components/constants'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const resp = await fetch(EP_TIMES + req.query.q)
    const data = await resp.json()
    res.status(200).json({ data: data })
}