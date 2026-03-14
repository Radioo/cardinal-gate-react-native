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
        formatted_value: string;
    }
    games: Game[];
}
