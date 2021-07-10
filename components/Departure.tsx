import React from "react";

export interface DeparturesType {
    direction: string;
    tripId: string;
    line: string;
    when: string;
    plannedWhen: string;
    delay: number;
}

export const Departure = (props: DeparturesType): JSX.Element => {

return (<h3>{JSON.stringify(props)}</h3>)
};