type LoginRequest = {
  email: string;
  password: string;
};

type HttpRequest = {
  body: LoginRequest;
};

type HttpResponse = {
  statusCode: number;
};

class LoginRouter {
  public route(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.email) {
      return { statusCode: 400 };
    }

    return { statusCode: 200 };
  }
}

describe("Login Router", () => {
  it("Should return 400 if no email is provided", async () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: "any_password",
        email: "",
      },
    };

    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
