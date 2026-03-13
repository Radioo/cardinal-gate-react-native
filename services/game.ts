import {Series} from "@/enums/series";
import {API_URL} from "@/services/env";

const seriesNames: Record<Series, string> = {
    [Series.IIDX]: 'beatmania IIDX',
    [Series.SDVX]: 'SOUND VOLTEX',
    [Series.DDR]: 'DanceDanceRevolution',
    [Series.NST]: 'NOSTALGIA',
    [Series.POPN]: 'pop\'n music',
    [Series.JUBEAT]: 'jubeat',
    [Series.RB]: 'REFLEC BEAT',
    [Series.MSC]: 'MÚSECA',
    [Series.BS]: 'BeatStream',
    [Series.GD]: 'GuitarFreaks & DrumMania',
    [Series.DEAC]: 'Dance Evolution',
};

export const getSeriesName = (series: Series): string =>
    seriesNames[series] ?? 'Unknown series';

export const formatArcadeId = (id: number): string => {
    const str = id.toString();
    return `${str.slice(0, 4)}-${str.slice(4, 8)}`;
};

export const getIidxScoreCardUrl = (playId: number): string =>
    `${API_URL}/api2/iidx/chart_screenshot/${playId}.png`;

export const formatGdSkillValue = (value: number | undefined): string => {
    if (value === undefined || value < 0) return '???';
    return (value / 100).toFixed(2);
};

const MINUTES_PER_PLAY = 2;

export const estimatePlayTimeHours = (playCounts: {count: number}[]): string => {
    const minutes = playCounts.reduce((total, item) => total + item.count * MINUTES_PER_PLAY, 0);
    const hours = minutes / 60;
    return Number.isInteger(hours) ? hours.toString() : hours.toFixed(1);
};
