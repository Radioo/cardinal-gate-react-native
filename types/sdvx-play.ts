import {SdvxDifficulty} from "@/enums/sdvx-difficulty";
import {SdvxClearType} from "@/enums/sdvx-clear-type";

export type SdvxPlay = {
    id: number;
    title: string;
    artist: string;
    difficulty: SdvxDifficulty;
    level: number;
    score: number;
    ex_score: number;
    clear_type: SdvxClearType;
    grade: string;
}
