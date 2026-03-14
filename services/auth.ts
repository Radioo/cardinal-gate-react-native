import {QueryClient} from "@tanstack/react-query";
import {clearSecureValue, saveSecureValue} from "@/services/secure-storage";
import {SecureValue} from "@/enums/secure-value";
import {queryClient as defaultQueryClient} from "@/services/query-client";

export async function setAuthToken(token: string): Promise<void> {
    await saveSecureValue(SecureValue.TOKEN, token);
}

/**
 * Clears the auth token and evicts all cached queries.
 * The query cache is cleared to prevent stale data from being shown
 * after the user logs out and a different user logs in.
 */
export async function clearSession(client: QueryClient = defaultQueryClient): Promise<void> {
    await clearSecureValue(SecureValue.TOKEN);
    client.removeQueries();
}
