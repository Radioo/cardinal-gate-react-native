import {GdDifficultyType} from "@/enums/gd-difficulty-type";
import {GdDifficulty} from "@/enums/gd-difficulty";

export type GdDifficultyContainer = {
    type: GdDifficultyType;
    difficulty: GdDifficulty;
    level: number;
}
