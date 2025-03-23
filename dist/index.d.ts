import { ITooltip } from 'react-tooltip';
import * as react_jsx_runtime from 'react/jsx-runtime';

type Data = Array<{ date: string; contributions: number }>;

interface ReactGithubHeatmapProps {
  data?: Data;
  endDate?: string | number | Date;
  startDate?: string | number | Date;
  tooltipContent?: (data: { date: string; contributions: number | null }) => string;
  tooltipOptions?: ITooltip;
}

declare const ReactGithubHeatmap: ({ tooltipContent, ...props }: ReactGithubHeatmapProps) => react_jsx_runtime.JSX.Element;

export { type Data, ReactGithubHeatmap, type ReactGithubHeatmapProps };
