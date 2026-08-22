import { StringSession } from "telegram/sessions";

export const getSessionString = () => process.env.TELEGRAM_SESSION || "";

export const saveSession = (client: any) => {
  const session = client.session.save();
  // In development, log this so you can copy it to your .env
  console.log("--- PERSISTENT SESSION STRING ---");
  console.log(session);
  console.log("---------------------------------");
  return session;
};