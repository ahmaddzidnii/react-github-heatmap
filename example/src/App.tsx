import { GithubGraphContribution } from "@ahmaddzidnii/react-github-heatmap";
import "./App.css";

function generateDataByDateRange(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const generatedData = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    generatedData.push({
      date: `${year}-${month}-${day}`,
      contributions: Math.floor(Math.random() * 51), // Random number between 0-100
    });
  }

  return generatedData;
}

export const get52WeeksDateRange = ({ endDate }: { endDate: Date }) => {
  // Go back approximately one year (52 weeks)
  let startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 52 * 7);

  // Adjust to the nearest Sunday if not already a Sunday
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }

  const strStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(startDate.getDate()).padStart(2, "0")}`;
  const strEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(endDate.getDate()).padStart(2, "0")}`;

  return { startDate: strStartDate, endDate: strEndDate };
};

function App() {
  const dateRange = get52WeeksDateRange({ endDate: new Date() });

  const data = generateDataByDateRange(dateRange.startDate, dateRange.endDate);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
      }}
    >
      <GithubGraphContribution data={data} />
    </div>
  );
}

export default App;
