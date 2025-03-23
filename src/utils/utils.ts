interface getDateRangeProps {
  endDate: Date;
}

export const getDateRange = ({ endDate }: getDateRangeProps) => {
  // Go back approximately one year (52 weeks)
  let startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 52 * 7);

  // Adjust to the nearest Sunday if not already a Sunday
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }

  return { startDate, endDate };
};

export const formatDateToOrdinalSuffix = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);

  // Menentukan ordinal suffix (st, nd, rd, th)
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${month} ${day}${suffix}`;
};

// Generate a matrix of dates for the full year (fixed to fill the entire grid)
export const generateDateGrid = (startDate: Date, endDate: Date) => {
  const TOTAL_COLUMNS = 53;
  const grid = Array.from({ length: 7 }, () => Array(TOTAL_COLUMNS).fill(null)) as
    | Date[][]
    | null[][];

  // Create a copy to avoid modifying the original date
  let currentDate = new Date(startDate);
  let week = 0;
  let dayOfWeek = currentDate.getDay();

  // When using the default "1 year ago to today" range, we want to fill the entire grid
  // with dates in sequence, without any gaps at the beginning
  while (currentDate <= endDate && week < TOTAL_COLUMNS) {
    // console.log(`Filling: ${currentDate.toDateString()} at [${dayOfWeek}][${week}]`);
    grid[dayOfWeek][week] = new Date(currentDate);

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);

    // If we've reached Sunday (0), move to the next column/week
    if (currentDate.getDay() === 0) {
      week++;
    }

    // Update the day of week
    dayOfWeek = dayOfWeek === 6 ? 0 : dayOfWeek + 1;
  }

  return grid;
};

// Generate months distribution with exactly 53 total columns
export const generateMonthsDistribution = (startDate: Date, endDate: Date) => {
  const TOTAL_COLUMNS = 53;
  const months = [];

  // Ensure the date range does not exceed one year
  const maxEndDate = new Date(startDate);
  maxEndDate.setFullYear(maxEndDate.getFullYear() + 1);

  if (endDate > maxEndDate) {
    endDate = maxEndDate;
  }

  // Get the list of months in the range
  const monthsList = [];
  let currentDate = new Date(startDate);
  currentDate.setDate(1); // Start from the first day of the month

  while (currentDate <= endDate) {
    monthsList.push({
      name: new Intl.DateTimeFormat("en-US", { month: "long" }).format(currentDate),
      year: currentDate.getFullYear(),
      days: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(),
    });

    // Move to the next month
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  }

  // Calculate total days in the period
  const totalDays = monthsList.reduce((sum, month) => sum + month.days, 0);

  // Distribute columns proportionally
  let remainingColumns = TOTAL_COLUMNS;

  for (let i = 0; i < monthsList.length; i++) {
    const month = monthsList[i];

    // For the last month, assign all remaining columns
    if (i === monthsList.length - 1) {
      months.push({
        name: month.name,
        year: month.year,
        colSpan: remainingColumns,
      });
    } else {
      // Calculate proportional column span based on days in month
      let colSpan = Math.round((month.days / totalDays) * TOTAL_COLUMNS);

      // Ensure minimum 1 column per month
      colSpan = Math.max(1, colSpan);

      // Don't exceed remaining columns
      colSpan = Math.min(colSpan, remainingColumns - (monthsList.length - i - 1));

      months.push({
        name: month.name,
        year: month.year,
        colSpan: colSpan,
      });

      remainingColumns -= colSpan;
    }
  }

  return months;
};

export const generateDataByDateRange = (startDate: string, endDate: string) => {
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
};

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
