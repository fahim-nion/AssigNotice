import { Api } from "telegram";
import { getTelegramClient, setFloodWait, setLoggingIn, isLoggingIn } from "./client";

export async function startAuthFlow(phoneNumber: string) {
    if (isLoggingIn()) throw new Error("AUTH_IN_PROGRESS");
    
    const client = await getTelegramClient();
    
    // Safety check: Don't sign in if already authorized
    if (await client.checkAuthorization()) return { status: "ALREADY_AUTHORIZED" };

    try {
        setLoggingIn(true);
        const { phoneCodeHash } = await client.sendCode(
            { apiId: Number(process.env.TELEGRAM_API_ID), apiHash: process.env.TELEGRAM_API_HASH! },
            phoneNumber
        );
        return { status: "SENDING_CODE", phoneCodeHash };
    } catch (err: any) {
        if (err.errorMessage?.includes("FLOOD")) {
            setFloodWait(err.seconds);
            throw err;
        }
        throw err;
    } finally {
        setLoggingIn(false);
    }
}

export async function signIn(phone: string, hash: string, code: string) {
    const client = await getTelegramClient();
    try {
        await client.invoke(new Api.auth.SignIn({
            phoneNumber: phone,
            phoneCodeHash: hash,
            phoneCode: code
        }));
        
        // IMPORTANT: Log this string ONCE in dev to save to .env
        const newSession = client.session.save() as unknown as string;
        console.log("--- SUCCESS! NEW TLGRM_SESSION STRING ---");
        console.log(newSession);
        console.log("-----------------------------------------");
        
        return { status: "SUCCESS" };
    } catch (err: any) {
        // Handle 2FA password needed here if necessary
        throw err;
    }
}