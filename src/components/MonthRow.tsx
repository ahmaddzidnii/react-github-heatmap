interface MonthRowProps {
  months: {
    name: string;
    year: number;
    colSpan: number;
  }[];
}

export const MonthRow = ({ months }: MonthRowProps) => {
  return (
    <thead>
      <tr className="contribution-graph__months-row">
        <td className=" contribution-graph__day-label">
          <span className="sr-only">Day of Week</span>
        </td>
        {months.map((month, index) => (
          <td
            key={`${month.name}-${month.year}-${index}`}
            colSpan={month.colSpan}
            className="contribution-graph__month"
          >
            <span className="sr-only">{month.name}</span>
            <span>{month.name.slice(0, 3)}</span>
          </td>
        ))}
      </tr>
    </thead>
  );
};
