import { assertEquals, assertThrows } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { loginRequest } from "../script.js";
import process from "node:process";

function mockFetch (response, status = 200) {
  globalThis.fetch = async () => 
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status: status,
      json: async () => Promise.resolve(response),
    });
}


Deno.test("loginRequest returns firstName and lastName on valid credentials", async () => {
  // Mock the fetch function to return a successful response with user data
  mockFetch({ id: 1, firstName: "Aashish", lastName: "Yadavally" });

  // Call the loginRequest function with valid credentials
  const result = await loginRequest("AYadavally", "COP4331");


  // Assert that the result contains the expected user data
  assertEquals(result, {
    userId: 1,
    firstName: "Aashish",
    lastName: "Yadavally"
  })
});

Deno.test("loginRequest throws error on invalid credentials", async () => {
  // Mock the fetch function to return a successful response with invalid user data
  mockFetch({ id: 0, firstName: "", lastName: "" });

  const result = await loginRequest("AYadavally", "WrongPassword").catch(err => err);

  // Assert that the error message is correct
  assertEquals(result.message, "User/Password combination incorrect");
});

Deno.test("loginRequest throws error on missing credentials", async () => {
  // Call the loginRequest function with missing credentials
  const result = await loginRequest("AYadavally", "").catch(err => err);

  // Assert that the error message is correct
  assertEquals(result.message, "Username and password are required");
});