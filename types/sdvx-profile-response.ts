import {Game} from "@/types/game";

// Field names match the API response shape — do not rename.
export type SdvxProfileResponse = {
    id: number;
    name: string;
    skill_level: string;
    volforce: null | {
        name: string;
        threshold: number;
        class: string;
        version: number;
        formattedValue: string;
    }
    games: Game[];
}
