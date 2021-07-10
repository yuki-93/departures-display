import React, { useEffect, useState } from "react";
import {Departure, DeparturesType} from "./Departure"

export const Departures = (): JSX.Element | null => {
    const [departures, setDepartures] = useState<Array<DeparturesType>>([])
    useEffect(() => {
        const getData = async() => {
            const data = await fetch("/api/departures").then(res => res.json())
            console.error(data);
            var filteredData: Array<any> = [];
            data.forEach(function(item: any){
                var i = filteredData.findIndex(x => x.tripId == item.tripId);
                if(i <= -1){
                    filteredData.push(item);
                }
              });


            setDepartures(filteredData.map(d => {
                const { direction, line, when, plannedWhen, delay, tripId } = d;
                return {
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
    }, [])

    if (departures.length === 0) {
        return null;
    }
    return (
        <>
            {departures.map((departure => <Departure {...departure} key={departure.tripId} />))}
        </>
    );
}