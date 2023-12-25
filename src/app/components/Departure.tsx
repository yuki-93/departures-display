import React from "react";
import styles from "./Departure.module.scss";
import { DeparturesType } from "../../../types";

export const Departure = ({
  cancelled,
  direction,
  line,
  when,
  plannedWhen,
  delay,
}: DeparturesType): React.ReactNode => {
  const whenDate = when !== null ? new Date(when) : null;
  const plannedWhenDate = new Date(plannedWhen);

  return (
    <div
      className={`${styles["card-gray"]} ${
        delay !== null && delay < 0 ? styles["earlier"] : ""
      } ${delay !== null && delay > 0 ? styles["delayed"] : ""}`}
    >
      <div>
        {line} | {direction}
      </div>
      {delay !== null && (
        <>
          <div className={styles.cancelled}>{`${
            cancelled ? "Fahrt fällt aus" : ""
          }`}</div>
          <div
            className={
              styles[`card-title-${delay < 0 ? "earlier" : "delayed"}`]
            }
          >
            {delay !== 0 && `Verspätung: ${delay / 60} min`}
          </div>
        </>
      )}
      <div>
        {whenDate !== null &&
          `aktuelle Uhrzeit: ${("0" + whenDate.getHours()).slice(-2)}:${(
            "0" + whenDate.getMinutes()
          ).slice(-2)} Uhr`}
      </div>
      <div>{`geplante Uhrzeit: ${("0" + plannedWhenDate.getHours()).slice(
        -2
      )}:${("0" + plannedWhenDate.getMinutes()).slice(-2)} Uhr`}</div>
    </div>
  );
};
