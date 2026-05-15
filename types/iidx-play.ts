import {IidxDifficulty} from "@/enums/iidx-difficulty";
import {IidxClearType} from "@/enums/iidx-clear-type";

/**
 * Domain-shaped IIDX play record. The snake_case fields (clear_type, ex_score,
 * perfect_count, great_count, miss_count, has_score_card) match the API
 * response shape and are passed through verbatim; the camelCase fields (title,
 * recordedAt) are normalised at the useIidxPlays boundary from the wire-format
 * `name` and `dts` so consumers see canonical names.
 */
export type IidxPlay = {
    id: number;
    title: string;
    artist: string;
    difficulty: IidxDifficulty;
    level: number;
    clear_type: IidxClearType;
    /** Whether the play ended in a stage failure (did not clear the song). */
    dead: boolean;
    ex_score: number;
    perfect_count: number;
    great_count: number;
    grade: string;
    percentage: number;
    miss_count: number | null;
    has_score_card: boolean;
    /** ISO date-time string when the play was recorded. */
    recordedAt: string;
}
