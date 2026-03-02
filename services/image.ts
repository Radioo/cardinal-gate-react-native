import * as FileSystem from 'expo-file-system';
import {fetchApiBlob} from "@/services/api";

export async function downloadToLocalFile(url: string, filename: string): Promise<string> {
    const response = await fetchApiBlob(url, undefined, {skipRootUrl: true});
    const targetPath = FileSystem.cacheDirectory + filename;

    const b64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(response);
    });

    await FileSystem.writeAsStringAsync(targetPath, b64.split(',')[1], {
        encoding: FileSystem.EncodingType.Base64,
    });

    return targetPath;
}
