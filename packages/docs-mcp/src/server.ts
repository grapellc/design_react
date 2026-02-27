import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import pkg from "../package.json" with { type: "json" };

export const server = new McpServer({
  name: "grape_design_react",
  version: pkg.version,
  capabilities: {
    prompts: {},
    resources: {},
    tools: {},
  },
});
