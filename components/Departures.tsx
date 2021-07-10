import React, { useEffect, useState } from "react";
import {Departure, DeparturesType} from "./Departure"

export const Departures = (): JSX.Element | null => {
    const [selectedStation, setSelectedStation] = useState("pankow");
    const [departures, setDepartures] = useState<Array<DeparturesType>>([])
    useEffect(() => {
        const getData = async() => {
            const data = await fetch("/api/departures/" + selectedStation).then(res => res.json())
            console.error(data);
            var filteredData: Array<any> = [];
            data.forEach(function(item: any){
                var i = filteredData.findIndex(x => x.tripId == item.tripId);
                if(i <= -1){
                    filteredData.push(item);
                }
              });


            setDepartures(filteredData.map(d => {
                const { direction, line, when, plannedWhen, delay, tripId, cancelled } = d;
                return {
                    cancelled,
                    tripId,
                    direction, 
                    line: line.name, 
                    when, 
                    plannedWhen, 
                    delay
                }
            }))
        };
        getData();
    }, [selectedStation])

    if (departures.length === 0) {
        return null;
    }
    return (
        <>
            <div>
                <h1 style={{margin: "20px"}}>
                    Abfahren für
                    <select onChange={(e) => setSelectedStation(e.target.value)} style={{marginLeft: "10px", marginRight: "10px", fontSize: "1em"}}>
                        <option value="pankow">S+U Pankow</option>
                        <option value="landsbergerAllee">S Landsberger Allee</option>
                    </select>
                    in den nächsten 30 Minuten
                </h1>    
            </div>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {departures.map((departure => <Departure {...departure} key={departure.tripId} />))}
            </div>
        </>
    );
}