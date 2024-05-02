import app from "../../../main";
import request from "supertest";

describe("POST /register", () => {
  it("correct return ", async () => {
    const res = await request(app).post("/api/users/auth/register").send({
      username: "test",
      email: "test@test.cl",
      password: "test123",
    });

    expect(res.statusCode).toEqual(200);
  });
});
