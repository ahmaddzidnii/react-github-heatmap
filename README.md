## React Github Heatmap

<img src="https://github.com/user-attachments/assets/23f9a2d6-cc57-4b3b-8644-5a9629c149fc" alt="img" style="border-radius: 16px;" />

<div align="center">
    <img src="https://badgen.net/npm/v/@ahmaddzidnii/react-github-heatmap" alt="NPM Version" />
  <img src="https://badgen.net/bundlephobia/minzip/@ahmaddzidnii/react-github-heatmap" alt="minzipped size"/>
    <img src="https://img.shields.io/github/stars/ahmaddzidnii/react-github-heatmap" alt="Star" />
</a>
</div>
<br />
<div align="center"><strong>React Heatmap – Visualize Data with Style.</strong></div>
<div align="center"> React Heatmap is a lightweight, highly customizable, and beautifully designed heatmap component for React. Whether you're tracking user interactions, visualizing complex datasets, or enhancing dashboards, this package makes it effortless to create stunning heatmaps.</div>
<br />

<div align="center">
  <sub>Cooked by <a href="https://github.com/ahmaddzidnii">ahmaddzidniii</a> 👨‍🍳</sub>
</div>

<br />

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Customizing Colors](#customizing-colors)
- [API](#api)

<br />

## Features

- ✅ Fully customizable colors
- ✅ Fast and lightweight for smooth performance
- ✅ Interactive & responsive for modern UI needs
- ✅ Easy integration with React projects

## Installation

#### With pnpm

```sh
pnpm add @ahmaddzidnii/react-github-heatmap
```

#### With NPM

```sh
npm install @ahmaddzidnii/react-github-heatmap
```

#### With Yarn

```sh
yarn add @ahmaddzidnii/react-github-heatmap
```

## Getting Started

First, to perform testing, we create helper functions `generateDataByDateRange()` and `get52WeeksDateRange` to generate the data in `./helpers.ts`.

```ts
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
```

Next, create your React component, for example in `App.tsx`

```tsx
import { ReactGithubHeatmap } from "@ahmaddzidnii/react-github-heatmap";
import { get52WeeksDateRange, generateDataByDateRange } from "./helpers";

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
```

## Customizing Colors

You can customize the colors of the heatmap by adding your own CSS classes. For example, you can define a custom class in your CSS file and apply it to the heatmap.

### Example

1. Create a CSS file (e.g., `styles.css`) and define your custom styles:

```css
[data-level="0"] {
  background-color: #ebedf0 !important;
}

[data-level="1"] {
  background-color: #9be9a8 !important;
}

[data-level="2"] {
  background-color: #40c463 !important;
}

[data-level="3"] {
  background-color: #30a14e !important;
}

[data-level="4"] {
  background-color: #216e39 !important;
}
```

2. Import the CSS file into your React component:

```tsx
import "./styles.css";
import { ReactGithubHeatmap } from "@ahmaddzidnii/react-github-heatmap";
import { get52WeeksDateRange, generateDataByDateRange } from "./helpers";

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
```

3. Run your application, and the heatmap will now use the custom styles defined in your CSS file.

## API

| Prop           | Type         | Description                                                                                                                   |
| -------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| data           | `arrayofobj` | Array of objects containing `date` and `contributions` for the heatmap.                                                       |
| startDate      | `string`     | The start date for the heatmap data range in `YYYY-MM-DD` format.                                                             |
| endDate        | `string`     | The end date for the heatmap data range in `YYYY-MM-DD` format.                                                               |
| tooltipContent | `function`   | Function to customize the content of the tooltip displayed on hover.                                                          |
| tooltipOptions | `object`     | Object to configure tooltip behavior and appearance. [See React Tooltip Docs](https://react-tooltip.com/docs/getting-started) |
