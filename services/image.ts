import {File, Paths} from "expo-file-system";
import {fetchApiBlob} from "@/services/api";
import {API_URL} from "@/services/env";

function isApiOrigin(url: string): boolean {
    return url.startsWith('/') || url.startsWith(API_URL);
}

export async function downloadToLocalFile(url: string, filename: string): Promise<string> {
    // Only attach auth headers to same-origin URLs so the CG-Token never leaks
    // to third-party image hosts (same allowlist used by ApiImage).
    const response = await fetchApiBlob(url, undefined, {skipRootUrl: true, skipAuth: !isApiOrigin(url)});
    const file = new File(Paths.cache, filename);

    const b64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (typeof result !== 'string') {
                reject(new Error('Unexpected FileReader result type'));
                return;
            }
            resolve(result);
        };
        reader.onerror = () => reject(new Error('Failed to read blob'));
        reader.readAsDataURL(response);
    });

    await file.write(b64.split(',')[1], {encoding: 'base64'});

    return file.uri;
}
