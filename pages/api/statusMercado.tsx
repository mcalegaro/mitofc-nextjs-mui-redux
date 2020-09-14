// import axios from 'axios'
// import { EP_ST_MERCADO } from '../../src/components/constants'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req)
    // const resp = await axios.get(EP_ST_MERCADO).catch(err => { return { data: { error: err.message } } })
    // console.log(resp)
    res.status(200).json({ name: 'name' })
    // console.log(res)
}