import { type ITooltip } from "react-tooltip";

export type Data = Array<{ date: string; contributions: number }>;

export interface ReactGithubHeatmapProps {
  data?: Data;
  endDate?: string | number | Date;
  startDate?: string | number | Date;
  tooltipContent?: (data: { date: string; contributions: number | null }) => string;
  tooltipOptions?: ITooltip;
}
