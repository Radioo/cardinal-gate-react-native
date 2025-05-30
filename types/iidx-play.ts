import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {IidxClearType} from "@/enums/iidx-clear-type";

export type IidxPlay = {
    id: number;
    name: string;
    artist: string;
    difficulty: IidxDifficulty;
    level: number;
    clear_type: IidxClearType;
    dead: boolean;
    ex_score: number;
    perfect_count: number;
    great_count: number;
    grade: string;
    percentage: number;
    miss_count: number | null;
    has_score_card: boolean;
    dts: string;
}
