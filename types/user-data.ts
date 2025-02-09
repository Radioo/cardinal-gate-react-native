import {Series} from "@/enums/series";

export type UserData = {
    account_id: number;
    username: string;
    developer: boolean;
    profiles: {
        [key in Series]: number | null;
    };
}
