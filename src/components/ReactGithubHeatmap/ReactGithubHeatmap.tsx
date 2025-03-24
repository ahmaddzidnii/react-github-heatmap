import classNames from "classnames";
import { Tooltip } from "react-tooltip";
import { useCallback, useMemo } from "react";

import {
  getDateRange,
  generateDateGrid,
  generateMonthsDistribution,
  formatDateToOrdinalSuffix,
} from "../../utils/utils";
import { ReactGithubHeatmapProps } from "./types";
import { levels, dayLabels } from "../../constant/index";

import "./ReactGithubHeatmap.css";
import { MonthRow } from "../MonthRow";

const ReactGithubHeatmap = ({
  tooltipContent = (contribution) => {
    if (!contribution.contributions) {
      return `No contributions on ${formatDateToOrdinalSuffix(contribution.date)}`;
    }

    return `${contribution.contributions} contributions on ${formatDateToOrdinalSuffix(
      contribution.date
    )}`;
  },
  ...props
}: ReactGithubHeatmapProps) => {
  const TODAY = new Date();
  const dateRange = getDateRange({
    endDate: TODAY,
  });

  if (!!props.startDate !== !!props.endDate) {
    throw new Error("Both startDate and endDate must be provided together.");
  }

  const DEFAULT_START_DATE = dateRange.startDate;
  const DEFAULT_END_DATE = dateRange.endDate;

  const startDate = props.startDate ? new Date(props.startDate) : DEFAULT_START_DATE;
  const endDate = props.endDate ? new Date(props.endDate) : DEFAULT_END_DATE;
  const contributionData = props.data || [];

  // Generate tooltip content for a cell
  const getTooltipContent = (date: Date) => {
    if (!date) return "";

    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

    const contribution = contributionData.find((item) => item.date === dateStr) || {
      date: dateStr,
      contributions: null,
    };

    return tooltipContent(contribution as { date: string; contributions: number });
  };

  // Calculate thresholds for each level in first render
  const thresholds = useMemo(() => {
    const nonZeroContributions = contributionData
      .filter((item) => item.contributions > 0)
      .map((item) => item.contributions);

    if (nonZeroContributions.length === 0) {
      return { level1: 1, level2: 2, level3: 3 };
    }

    const maxContribution = Math.max(...nonZeroContributions);
    return {
      level1: Math.ceil(maxContribution * 0.25),
      level2: Math.ceil(maxContribution * 0.5),
      level3: Math.ceil(maxContribution * 0.75),
    };
  }, [contributionData]);

  // Function to get level of a date based on contribution count
  const getLevel = useCallback(
    (date: Date) => {
      if (!date) return 0;
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;
      const contribution = contributionData.find((item) => item.date === dateStr);

      if (!contribution || contribution.contributions === 0) return 0;
      if (contribution.contributions <= thresholds.level1) return 1;
      if (contribution.contributions <= thresholds.level2) return 2;
      if (contribution.contributions <= thresholds.level3) return 3;
      return 4;
    },
    [contributionData, thresholds]
  );

  const dateGrid = generateDateGrid(startDate, endDate);
  const months = generateMonthsDistribution(startDate, endDate);

  return (
    <div className="contribution-graph">
      <div className="contribution-graph__container">
        <div className="contribution-graph__table-wrapper">
          <table className="contribution-graph__table">
            <caption className="sr-only">Contribution Graph</caption>
            <MonthRow months={months} />
            <tbody>
              {dateGrid.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="contribution-graph__week-row"
                >
                  <td className="contribution-graph__day-label-wrapper">
                    <span
                      className={classNames("contribution-graph__day-label", {
                        "sr-only": rowIndex % 2 !== 1,
                      })}
                    >
                      {dayLabels[rowIndex]}
                    </span>
                  </td>

                  {row.map((date, colIndex) => {
                    if (!date) {
                      return <td key={colIndex}></td>;
                    }

                    return (
                      <td
                        key={colIndex}
                        tabIndex={0}
                        data-level={getLevel(date)}
                        data-date={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        )}-${String(date.getDate()).padStart(2, "0")}`}
                        data-tooltip-id="tooltip"
                        data-tooltip-content={getTooltipContent(date)}
                        className="contribution-graph__cell"
                      ></td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <Tooltip
            id="tooltip"
            {...props.tooltipOptions}
          />
        </div>
        <div className="contribution-graph__legend">
          <span className="contribution-graph__legend-text">Learn how we count contributions</span>
          <div className="contribution-graph__legend-scale">
            <span className="contribution-graph__legend-label mr-1">Less</span>
            {levels.map((level) => (
              <div
                key={level.level}
                data-level={level.level}
                className="contribution-graph__legend-box"
              >
                <span className="sr-only">{level.name}</span>
              </div>
            ))}
            <span className="contribution-graph__legend-label">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactGithubHeatmap;
