import app from "../../../main";
import request from "supertest";
import { completeUserAuth } from "../../../types/types";

const correctExpectedResponse: completeUserAuth = {
  username: "test",
  email: "test@test.cl",
  isTester: false,
  isActive: true,
  role: "usuario",
  avatar: "avatar.jpg",
  allowPersonalDocuments: false,
  timezone: "UTC",
  isPremium: false,
};

describe("POST /register", () => {
  it("correct return ", async () => {
    const res = await request(app).post("/api/users/auth/register").send({
      username: "test",
      email: "test@test.cl",
      password: "test123",
    });

    expect(res.statusCode).toEqual(200);
  });

  it("POST /register correct response", async () => {
    const res = await request(app).post("/api/users/auth/register").send({
      username: "test",
      email: "test@test.cl",
      password: "test123",
    });
    expect(res.body.user).toEqual(correctExpectedResponse);
  });
});
