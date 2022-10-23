import request from "supertest";
import { app } from "../app";

const expectedSuccessResponse = expect.objectContaining({
  users: expect.arrayContaining([
    expect.objectContaining({
      username: expect.any(String),
      name: expect.any(String),
      followersCount: expect.any(Number),
      avatarUrl: expect.any(String),
    }),
  ]),
  metaData: expect.objectContaining({
    endCursor: expect.any(String),
  }),
});

const expectErrorResponse = expect.objectContaining({
  errors: expect.arrayContaining([
    expect.objectContaining({
      key: expect.any(Array),
      message: expect.any(String),
    }),
  ]),
});

describe("GET /api/v1/github/users", () => {
  test("Responds with json when no query params are provided ", async () => {
    const response = await request(app)
      .get("/api/v1/github/users")
      .set({ Accept: "application/json" });

    expect(response.status).toEqual(200);

    expect(response.body).toEqual(expectedSuccessResponse);
  });

  test("Responds with json when query params are provided (language & limit)", async () => {
    const limit = 10;
    const response = await request(app)
      .get(`/api/v1/github/users?language=java&limit=${limit}`)
      .set({ Accept: "application/json" });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedSuccessResponse);

    expect(response.body.users).toHaveLength(limit);
  });

  test("Responds with 400 when wrong cursor is provided", async () => {
    const limit = 10;
    const response = await request(app)
      .get(`/api/v1/github/users?language=java&limit=${limit}&cursor=badValue`)
      .set({ Accept: "application/json" });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual(expectErrorResponse);
  });

  test("Responds with 400 when bad query parameters are provided", async () => {
    const limit = "string";
    const response = await request(app)
      .get(`/api/v1/github/users?language=java&limit=${limit}`)
      .set({ Accept: "application/json" });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual(expectErrorResponse);
  });
});
