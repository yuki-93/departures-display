import type { NextApiRequest, NextApiResponse } from "next"

const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

type Stations = "pankow" | "landsbergerAllee" | "mollStrOttoBraunStr" | "hennigsdorf";

const LOCATIONS = {
    pankow: {name: "S+U Pankow", code: "900000130002"},
    landsbergerAllee: {name: "S Landsberger Allee", code: "900000110004"},
    mollStrOttoBraunStr: {name: "Mollstr. / Otto-Braun-Str.", code: "900000100040"},
    hennigsdorf: {name: "S Hennigsdorf", code: "900000200000"}
}

const client = createClient(vbbProfile, 'departures-display')
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {station} = req.query as {station: Stations};

    await client.departures(LOCATIONS[station].code, {duration: 30}).then((resp: any) => res.end(JSON.stringify(resp)))
}