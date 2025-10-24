import request from "supertest";
import express from "express";
import { createRouter } from "../src/routes.js";

function makeApp(apiKey) {
  const app = express();
  app.use(express.json());
  app.use("/", createRouter({ log: { info: () => {} }, apiKey }));
  return app;
}

describe("API", () => {
  it("health returns ok", async () => {
    const app = makeApp("test-key");
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("notes requires api key on POST", async () => {
    const app = makeApp("test-key");
    const res = await request(app).post("/notes").send({ text: "hej" });
    expect(res.statusCode).toBe(401);
  });

  it("creates note with correct api key", async () => {
    const app = makeApp("test-key");
    const res = await request(app)
      .post("/notes")
      .set("x-api-key", "test-key")
      .send({ text: "hej" });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.text).toBe("hej");
  });
});
