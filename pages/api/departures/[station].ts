
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

interface Stations { 
    station: "pankow" | "landsbergerAllee"
}
const LOCATIONS = {
    pankow: {name: "S+U Pankow", code: "900000130002"},
    landsbergerAllee: {name: "S Landsberger Allee", code: "900000110004"},
    mollStrOttoBraunStr: {name: "Mollstr. / Otto-Braun-Str.", code: "900000100040"}
}

const client = createClient(vbbProfile, 'departures-display')
export default async function handler(req: any, res: any) {
    const {station}: Stations = req.query;

    await client.departures(LOCATIONS[station].code, {duration: 30}).then((resp: any) => res.end(JSON.stringify(resp)))
}