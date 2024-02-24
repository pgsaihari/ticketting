import request from "supertest";
import { app } from "../../app";

it("fails when a email does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin ")
    .send({
      email: "tesst@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails if incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signin ")
    .send({
      email: "tesst@test.com",
      password: "password",
    })
    .expect(201);

    await request(app)
    .post("/api/users/signin ")
    .send({
      email: "tesst@test.com",
      password: "pass",
    })
    .expect(400); 

});
