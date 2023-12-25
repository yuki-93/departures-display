export type Stations =
  | "landsbergerAllee"
  | "mollStrOttoBraunStr"
  | "hennigsdorf";

export type DeparturesType = {
  cancelled: boolean;
  direction: string;
  tripId: string;
  line: string;
  when: string | null;
  plannedWhen: string;
  delay: number | null;
};
