import {clearSecureValue, saveSecureValue} from "@/store/secure";
import {SecureValue} from "@/enums/secure-value";
import {queryClient} from "@/services/query-client";

export async function setAuthToken(token: string): Promise<void> {
    await saveSecureValue(SecureValue.TOKEN, token);
}

export async function clearSession(): Promise<void> {
    await clearSecureValue(SecureValue.TOKEN);
    queryClient.removeQueries();
}
