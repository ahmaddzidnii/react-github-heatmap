import "../Index.css";

import React from "react";
import { useCallback, useMemo } from "react";
import { Tooltip, type ITooltip } from "react-tooltip";

import { Data } from "../types/types";
import { levels, dayLabels } from "../constant";
import {
  formatDateToOrdinalSuffix,
  generateDateGrid,
  generateMonthsDistribution,
  getDateRange,
} from "../utils/utils";

interface GithubGraphContributionProps {
  data?: Data;
  endDate?: string | number | Date;
  startDate?: string | number | Date;
  tooltipContent?: (data: { date: string; contributions: number | null }) => string;
  tooltipOptions?: ITooltip;
}

export const GithubGraphContribution = ({
  tooltipContent = (contribution) => {
    if (!contribution.contributions) {
      return `No contributions on ${formatDateToOrdinalSuffix(contribution.date)}`;
    }

    return `${contribution.contributions} contributions on ${formatDateToOrdinalSuffix(
      contribution.date
    )}`;
  },
  ...props
}: GithubGraphContributionProps) => {
  const TODAY = new Date();
  const dateRange = getDateRange({
    endDate: TODAY,
  });

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

  // Hitung threshold sekali di awal render
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

  // Fungsi yang akan dipanggil untuk setiap sel
  const getLevel = useCallback(
    (date: Date) => {
      if (!date) return 0;
      const dateStr = date.toISOString().split("T")[0];
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          maxWidth: "calc(100vw - 32px)",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <table
          style={{
            width: "max-content",
            overflow: "hidden",
            position: "relative",
            borderCollapse: "separate",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <caption className="sr-only">Contribution Graph</caption>
          <thead>
            <tr
              style={{
                height: "13px",
              }}
            >
              <td style={{ width: "28px" }}>
                <span className="sr-only">Day of Week</span>
              </td>
              {months.map((month, index) => (
                <td
                  key={`${month.name}-${month.year}-${index}`}
                  colSpan={month.colSpan}
                  style={{
                    fontSize: "12px",
                    paddingTop: "0.125em",
                    paddingBottom: "0.125em",
                    paddingRight: "0.5em",
                    paddingLeft: "0px",
                  }}
                >
                  <span className="sr-only">{month.name}</span>
                  <span>{month.name.slice(0, 3)}</span>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {dateGrid.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{ height: "10px" }}
              >
                <td
                  style={{
                    position: "relative",
                    width: "28px",
                    textAlign: "right",
                  }}
                >
                  <span
                    className={rowIndex % 2 === 1 ? "" : "sr-only"}
                    style={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "4px",
                      fontSize: "12px",
                      paddingTop: "0.125em",
                      paddingBottom: "0.125em",
                      paddingRight: "0.5em",
                      paddingLeft: "0px",
                    }}
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
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "3px",
                        outline: "1px solid rgba(27, 31, 35, 0.06)",
                        outlineOffset: "-1px",
                      }}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <Tooltip
          id="tooltip"
          delayShow={100}
          {...props.tooltipOptions}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "48px",
          paddingRight: "16px",
          marginTop: "0.25rem",
        }}
      >
        <span
          style={{
            fontSize: "12px",
          }}
        >
          Learn how we count contributions
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              marginRight: "0.25rem",
            }}
          >
            Less
          </span>
          {levels.map((level) => (
            <div
              key={level.level}
              data-level={level.level}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "3px",
                outline: "1px solid rgba(27, 31, 35, 0.06)",
                outlineOffset: "-1px",
                marginRight: "0.25rem",
              }}
            >
              <span className="sr-only">{level.name}</span>
            </div>
          ))}
          <span
            style={{
              fontSize: "12px",
            }}
          >
            More
          </span>
        </div>
      </div>
    </div>
  );
};
