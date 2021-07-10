import React from "react";

export interface DeparturesType {
    cancelled: boolean;
    direction: string;
    tripId: string;
    line: string;
    when: string | null;
    plannedWhen: string;
    delay: number | null;
}

export const Departure = ({ cancelled, direction, line, when, plannedWhen, delay }: DeparturesType): JSX.Element => {
    const whenDate = when !== null ? new Date(when) : null;
    const plannedWhenDate = new Date(plannedWhen);
    return (
        <div style={{border: "1px solid gray", borderRadius: "10px", padding: "10px", margin: "10px", flex: "0 1 300px", backgroundColor: "lightblue"}}>
            <div>{line} | {direction}</div>
            <div style={{color: "red", fontWeight: "bold"}}>{`${cancelled ? "Fahrt fällt aus" : ""}`}</div>
            {
                delay !== null && 
                <div style={{color: delay < 0 ? "green" : "red", fontWeight: "bold"}}>{delay !== 0 && `Verspätung: ${delay/60} min`}</div>
            }
            <div>{whenDate !== null && `aktuelle Uhrzeit: ${("0" + whenDate.getHours()).slice(-2)}:${("0" + whenDate.getMinutes()).slice(-2)} Uhr`}</div>
            <div>{`geplante Uhrzeit: ${("0" + plannedWhenDate.getHours()).slice(-2)}:${("0" + plannedWhenDate.getMinutes()).slice(-2)} Uhr`}</div>
        </div>  
    )
};