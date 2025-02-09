import reactConfig from "@common/eslint-config/react.config.js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  { files: ["**/*.ts", "**/*.tsx"] },
  ...reactConfig
);
