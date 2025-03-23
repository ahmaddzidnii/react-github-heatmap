import { ReactGithubHeatmap } from "./components/ReactGithubHeatmap";
import { generateDataByDateRange, get52WeeksDateRange } from "./utils/utils";

const App = () => {
  const { endDate, startDate } = get52WeeksDateRange({
    endDate: new Date(),
  });
  const data = generateDataByDateRange(startDate, endDate);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ReactGithubHeatmap
        data={data}
        tooltipContent={(t) => {
          if (!t.contributions) {
            return `No contributions on ${t.date}`;
          }

          return `${t.contributions} contributions on ${t.date}`;
        }}
        tooltipOptions={{
          place: "top",
        }}
      />
    </div>
  );
};

export default App;
