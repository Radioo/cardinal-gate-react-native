import {Series} from "@/enums/series";

const getSeriesName = (series: Series): string => {
    switch(series) {
        case Series.IIDX:
            return 'beatmania IIDX';
        case Series.SDVX:
            return 'SOUND VOLTEX';
        case Series.DDR:
            return 'DanceDanceRevolution';
        case Series.NST:
            return 'NOSTALGIA';
        case Series.POPN:
            return 'pop\'n music';
        case Series.JUBEAT:
            return 'jubeat';
        case Series.RB:
            return 'REFLEC BEAT';
        case Series.MSC:
            return 'MÚSECA';
        case Series.BS:
            return 'BeatStream';
        case Series.GD:
            return 'GuitarFreaks & DrumMania';
        case Series.DEAC:
            return 'Dance Evolution';
        default:
            return 'Unknown series';
    }
}

export {
    getSeriesName,
}
