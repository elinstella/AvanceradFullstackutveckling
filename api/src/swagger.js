export const openapi = {
  openapi: "3.0.0",
  info: { title: "Reflektions-API", version: "1.0.0" },
  paths: {
    "/health": {
      get: { summary: "Health", responses: { "200": { description: "OK" } } }
    },
    "/notes": {
      get: { summary: "List notes", responses: { "200": { description: "OK" } } },
      post: {
        summary: "Create note",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", properties: { text: { type: "string" } }, required: ["text"] }
            }
          }
        },
        responses: { "201": { description: "Created" }, "401": { description: "Unauthorized" } }
      }
    }
  }
};
