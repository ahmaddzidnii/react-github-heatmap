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
<!-- <div align="center">
<a href="https://react-hot-toast.com/">Website</a> 
<span> · </span>
<a href="https://react-hot-toast.com/docs">Documentation</a> 
<span> · </span>
<a href="https://twitter.com/timolins">Twitter</a>
</div> -->

<br />
<div align="center">
  <sub>Cooked by <a href="https://github.com/ahmaddzidnii">ahmaddzidniii</a> 👨‍🍳</sub>
</div>

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

Add the Toaster to your app first. It will take care of rendering all notifications emitted. Now you can trigger `toast()` from anywhere!

```jsx
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast.");

const App = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};
```

## API

| Required | Prop                | Type       | Description                                                                 |
| :------: | ------------------- | ---------- | --------------------------------------------------------------------------- |
|    ✓     | clientId            | `string`   | [**Google API client ID**](https://console.cloud.google.com/apis/dashboard) |
|          | nonce               | `string`   | Nonce applied to GSI script tag. Propagates to GSI's inline style tag       |
|          | onScriptLoadSuccess | `function` | Callback fires on load gsi script success                                   |
|          | onScriptLoadError   | `function` | Callback fires on load gsi script failure                                   |

<!-- ## Documentation

Find the full API reference on [official documentation](https://react-hot-toast.com/docs). -->
