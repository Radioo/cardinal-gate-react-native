import {Game} from "@/types/game";

export type IidxProfileResponse = {
    iidx_id: number;
    dj_name: string;
    sp_play_count: number;
    dp_play_count: number;
    sp_class: number;
    dp_class: number;
    games: Game[];
}
