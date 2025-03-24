import { ITooltip } from 'react-tooltip';
import * as react_jsx_runtime from 'react/jsx-runtime';

type Data = Array<{ date: string; contributions: number }>;

/**
 * Props for the ReactGithubHeatmap component.
 */
interface ReactGithubHeatmapProps {
  /**
   * The data to be displayed in the heatmap.
   */
  data?: Data;

  /**
   * The start date for the heatmap range. Can be a string, number, or Date object.
   * @example 2020-02-18
   * @type {string}
   */
  startDate?: string;

  /**
   * The end date for the heatmap range. Can be a string, number, or Date object.
   * @example 2021-02-18
   * @type {string}
   */
  endDate?: string;

  /**
   * A function to generate the content for the tooltip. Receives an object containing
   * the date and the number of contributions for that date.
   *
   * @param data - An object containing the date and contributions.
   * @returns A string to be displayed in the tooltip.
   */
  tooltipContent?: (data: { date: string; contributions: number | null }) => string;

  /**
   * Options for customizing the tooltip behavior and appearance.
   */
  tooltipOptions?: ITooltip;
}

declare const ReactGithubHeatmap: ({ tooltipContent, ...props }: ReactGithubHeatmapProps) => react_jsx_runtime.JSX.Element;

export { type Data, ReactGithubHeatmap, type ReactGithubHeatmapProps };
