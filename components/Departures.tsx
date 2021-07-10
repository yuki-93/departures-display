import React, { useEffect, useState } from "react";
import {Departure, DeparturesType} from "./Departure"

export const Departures = (): JSX.Element | null => {
    const [selectedStation, setSelectedStation] = useState(global?.window?.sessionStorage.getItem("selectedStation") || "pankow");
    const [departures, setDepartures] = useState<Array<DeparturesType>>([]);
    const currentDate = new Date();

    global?.window?.setTimeout(() => {
        global?.window?.location.reload();
    }, 30*1000);

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
                <h1 style={{margin: "10px"}}>
                    Abfahren für
                    <select 
                        onChange={(e) => {
                            global?.window?.sessionStorage.setItem("selectedStation", e.target.value)
                            setSelectedStation(e.target.value); 
                        }}
                        style={{marginLeft: "10px", marginRight: "10px", fontSize: "1em"}}
                        value={global?.window?.sessionStorage.getItem("selectedStation") || "pankow"}
                    >
                        <option value="pankow">S+U Pankow</option>
                        <option value="landsbergerAllee">S Landsberger Allee</option>
                    </select>
                    in den nächsten 30 Minuten
                </h1>
                <div style={{margin: "10px", border: "1px solid gray", borderRadius: "10px", padding: "10px", backgroundColor: "lightblue", width: "300px"}}>
                    <div>Letzte Aktualisierung {`${("0" + currentDate.getHours()).slice(-2)}:${("0" + currentDate.getMinutes()).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)} Uhr`}</div>
                </div>
            </div>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {departures.map((departure => <Departure {...departure} key={departure.tripId} />))}
            </div>
        </>
    );
}