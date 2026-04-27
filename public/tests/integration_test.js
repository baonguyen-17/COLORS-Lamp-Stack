
import { loginRequest } from "../script.js";
import { assertEquals, assertExists } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import process from "node:process";


const urlBase = `http://${Deno.env.get("URL_DOMAIN")}/LAMPAPI`;		// Change ${...} part to your purchased domain here
const endpoint = 'Login.php';


async function callLoginRequest(login, password) {

  const response = await fetch (`${urlBase}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({ login: login, password: password })
  });

  return {
    status: response.status,
    ok: response.ok,
    json: await response.json(),
  }
}

Deno.test("Login API returns 200 and user data on valid credentials", async () => {
  const response = await callLoginRequest("AYadavally", "COP4331");
  assertEquals(response.status, 200);
  assertExists(response.json);

  assertExists(response.json.id);
  assertEquals(typeof response.json.id, "number");

  assertExists(response.json.firstName);
  assertExists(response.json.lastName);
  assertEquals(typeof response.json.firstName, "string");
  assertEquals(typeof response.json.lastName, "string");
});