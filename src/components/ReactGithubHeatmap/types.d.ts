import { type ITooltip } from "react-tooltip";

export type Data = Array<{ date: string; contributions: number }>;

/**
 * Props for the ReactGithubHeatmap component.
 */
export interface ReactGithubHeatmapProps {
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
