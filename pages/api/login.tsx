import axios from 'axios'
// import { NextApiRequest } from 'next'
import { EP_LOGIN } from '../../src/components/constants'

// import util from 'util'

export default async (req: any, res: any) => {
    const body = req.body
    const data = {
        payload: {
            email: body.email,
            password: body.password,
            serviceId: 6860
        }
    }
    const hdrs = {
        'Content-Type': 'application/json',
        'host': 'login.globo.com'
    }

    const resp = await axios.post(EP_LOGIN, data, { headers: hdrs })
        .catch((err: any) => {
            console.log('err: ' + err)
            return {
                status: 500,
                data: {
                    error: '' + err
                }
            }
        })
    // console.log('resp: ' + util.inspect(resp.data, true, 0, true))
    res.status(resp.status).json(resp.data ? resp.data : {})
}