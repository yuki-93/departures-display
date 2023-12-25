"use client";
import React, { useEffect, useState } from "react";
import { Departure } from "./Departure";
import { defaultStation } from "./globals";
import styles from "./Departures.module.scss";
import { DeparturesType } from "../../../types";

export const Departures = (): React.ReactNode => {
  const [selectedStation, setSelectedStation] = useState(
    global?.window?.sessionStorage.getItem("selectedStation") || defaultStation
  );
  const [departures, setDepartures] = useState<Array<DeparturesType>>([]);
  const currentDate = new Date();

  global?.window?.setTimeout(() => {
    global?.window?.location.reload();
  }, 30 * 1000);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch("/api/departures/" + selectedStation).then(
        (res) => res.json()
      );
      var filteredData: Array<any> = [];
      data.forEach(function (item: any) {
        var i = filteredData.findIndex((x) => x.tripId == item.tripId);
        if (i <= -1) {
          filteredData.push(item);
        }
      });

      setDepartures(
        filteredData.map((d) => {
          const {
            direction,
            line,
            when,
            plannedWhen,
            delay,
            tripId,
            cancelled,
          } = d;
          return {
            cancelled,
            tripId,
            direction,
            line: line.name,
            when,
            plannedWhen,
            delay,
          };
        })
      );
    };
    getData();
  }, [selectedStation]);

  if (departures.length === 0) {
    return null;
  }
  return (
    <>
      <div>
        <h1 className={styles.headline}>
          Abfahren für
          <select
            onChange={(e) => {
              global?.window?.sessionStorage.setItem(
                "selectedStation",
                e.target.value
              );
              setSelectedStation(e.target.value);
            }}
            className={styles.select}
            value={selectedStation}
          >
            <option value="hennigsdorf">S Hennigsdorf</option>
            <option value="pankow">S+U Pankow</option>
            <option value="landsbergerAllee">S Landsberger Allee</option>
            <option value="mollStrOttoBraunStr">
              Mollstr. / Otto-Braun-Str.
            </option>
          </select>
          in den nächsten 30 Minuten
        </h1>
        <div className={styles["card-gray"]}>
          {`Letzte Aktualisierung ${("0" + currentDate.getHours()).slice(
            -2
          )}:${("0" + currentDate.getMinutes()).slice(-2)}:${(
            "0" + currentDate.getSeconds()
          ).slice(-2)} Uhr`}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {departures.map((departure) => (
          <Departure {...departure} key={departure.tripId} />
        ))}
      </div>
      <div className={styles["card-gray"]}>
        <>
          {`Quellcode auf `}
          <a
            href="https://github.com/yuki-93/departures-display"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          {`.`}
        </>
      </div>
    </>
  );
};
