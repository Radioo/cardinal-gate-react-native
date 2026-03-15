import {File, Paths} from 'expo-file-system';
import {fetchApiBlob} from "@/services/api";

export async function downloadToLocalFile(url: string, filename: string): Promise<string> {
    const response = await fetchApiBlob(url, undefined, {skipRootUrl: true});
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
        reader.onerror = reject;
        reader.readAsDataURL(response);
    });

    await file.write(b64.split(',')[1], {encoding: 'base64'});

    return file.uri;
}
