import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";
import postCss from "rollup-plugin-postcss";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      PeerDepsExternalPlugin(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      postCss(),
    ],
    external: ["react", "react-dom", "react-tooltip", "classnames"],
  },
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [dts.default()],
    external: [/\.css/],
  },
];
