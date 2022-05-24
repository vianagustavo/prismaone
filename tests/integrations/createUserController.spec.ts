import "express-async-errors";
import { superAppRequest } from "../setup";

export interface IAuthenticateUserResponse {
  token: string;
}

async function authenticateMaster() {
  const body = {
    login: "admin",
    password: "admin"
  };
  const authenticateUserResponse = await superAppRequest
    .post("/auth/user/login")
    .send(body);
  const authenticateResponseBody =
    authenticateUserResponse.body as IAuthenticateUserResponse;
  return authenticateResponseBody;
}

describe("Create User Controller", () => {
  it("Should be able to create a new user", async () => {
    const userData = {
      name: "lorinhoaaa",
      password: "1234",
      login: "axtion101"
    };

    const authenticationResponse = await authenticateMaster();
    const response = await superAppRequest
      .post("/users")
      .set("Authorization", `Bearer ${authenticationResponse.token}`)
      .send(userData);
    expect(response.status).toBe(200);
  });
});
