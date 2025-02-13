import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { publicProcedure, router } from "./trpc";

const appRouter = router({
  hello: publicProcedure.query(() => {
    return { message: "Hello, world!" };
  })
});

export type AppRouter = typeof appRouter;

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
