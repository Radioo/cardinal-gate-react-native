import {GdGameMode} from "@/enums/gd-game-mode";
import {GdDifficultyContainer} from "@/types/gd-difficulty-container";
import {GdSkillListType} from "@/enums/gd-skill-list-type";

export type GdMusicSkillItem = {
    music_id: number;
    skill: number;
    percentage: number;
    difficulty: GdDifficultyContainer;
    title: string;
}

type GdGameModeData = {
    skill: number;
    all_music_skill: number;
    new?: GdMusicSkillItem[];
    exist?: GdMusicSkillItem[];
};

export type GdSkillDataResponse = {
    skill_data: {
        [key in GdGameMode]: GdGameModeData;
    }
}
