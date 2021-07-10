
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')
const client = createClient(vbbProfile, 'departures-display')
export default async function handler(req, res) {
    await client.departures('900000130002', {duration: 10}).then((resp) => res.end(JSON.stringify(resp)))
}