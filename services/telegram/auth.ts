import { Api } from "telegram";
import { getTelegramClient } from "./client";
import { saveSession } from "./session";

let loginInProgress = false;

export async function handleSignIn(phone: string, code: string, phoneCodeHash: string) {
  if (loginInProgress) throw new Error("LOGIN_ALREADY_IN_PROGRESS");
  
  const client = await getTelegramClient();

  // RULE: Check authorization first
  if (await client.checkAuthorization()) {
    return { message: "Already logged in" };
  }

  try {
    loginInProgress = true;
    const result = await client.invoke(
      new Api.auth.SignIn({
        phoneNumber: phone,
        phoneCodeHash: phoneCodeHash,
        phoneCode: code,
      })
    );

    // Save session to logs so user can put it in .env
    saveSession(client);
    return result;
  } catch (error: any) {
    if (error.errorMessage?.includes("FLOOD")) {
      throw new Error(`Telegram Rate Limit: Wait ${error.seconds} seconds.`);
    }
    throw error;
  } finally {
    loginInProgress = false;
  }
}