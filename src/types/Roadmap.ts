export type RoadmapVote = {
  up: number;
  down: number;
};

export type RoadmapItemStatus = "PLANNED" | "PROGRESS" | "DONE";

export type RoadmapItem = {
  _id: string;
  title: string;
  desc: string;
  status: RoadmapItemStatus;
  link?: string;
  votes?: RoadmapVote;
};

export type RoadmapQuarter = {
  _id: string;
  quarter: string;
  focus: string;
  kpi: string;
  progress: number;
  items: RoadmapItem[];
};

export type Roadmap = {
  _id: string;
  year: number;
  quarters: RoadmapQuarter[];
};
