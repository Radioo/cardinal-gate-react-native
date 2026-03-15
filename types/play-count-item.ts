import {Series} from "@/enums/series";

// Field names match the API response shape — do not rename.
export type PlayCountItem = {
    count: number;
    game: Series;
}
