import {Game} from "@/types/game";

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
