import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { publicProcedure, router } from "./trpc";
import type { inferRouterOutputs } from "@trpc/server";

const appRouter = router({
  hello: publicProcedure.query(() => {
    return { message: "Hello, world!" };
  })
});

export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;

const app = express();
const port = process.env.PORT || 3000;
const frontendPort = process.env.FRONTEND_PORT || 5173;

app.use(
  cors({
    origin: `http://localhost:${frontendPort}`
  })
);

app.get("/", (_req, res) => {
  res.send("Hello, world!");
});

app.use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
