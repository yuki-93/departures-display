
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

const client = createClient(vbbProfile, 'departures-display')
export default async function handler(req: any, res: any) {
    const {station}: {station: "pankow" | "landsbergerAllee"} = req.query;
    const locations = {
        pankow: {name: "S+U Pankow", code: "900000130002"},
        landsbergerAllee: {name: "S Landsberger Allee", code: "900000110004"}
    }
    await client.departures(locations[station].code, {duration: 30}).then((resp: any) => res.end(JSON.stringify(resp)))
}