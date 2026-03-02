import {SdvxClearType} from "@/enums/sdvx-clear-type";
import ColorBadge from "@/components/themed/ColorBadge";

const CLEAR_TYPE_DATA: Record<SdvxClearType, { text: string; color: string }> = {
    [SdvxClearType.NO_PLAY]: {text: 'NO PLAY', color: '#808080'},
    [SdvxClearType.PLAYED]: {text: 'PLAYED', color: '#808080'},
    [SdvxClearType.COMPLETE]: {text: 'COMPLETE', color: '#39853D'},
    [SdvxClearType.EXCESSIVE_COMPLETE]: {text: 'EXCESSIVE COMPLETE', color: '#8f30d7'},
    [SdvxClearType.MAXXIVE_COMPLETE]: {text: 'MAXXIVE COMPLETE', color: '#b4b4b4'},
    [SdvxClearType.ULTIMATE_CHAIN]: {text: 'ULTIMATE CHAIN', color: '#B0283D'},
    [SdvxClearType.PERFECT_ULTIMATE_CHAIN]: {text: 'PUC', color: '#b2af00'},
};

type SdvxClearTypeItemProps = {
    clearType: SdvxClearType;
}

export default function SdvxClearTypeItem({clearType}: SdvxClearTypeItemProps) {
    const data = CLEAR_TYPE_DATA[clearType] ?? {text: '', color: '#000000'};
    return <ColorBadge text={data.text} color={data.color}/>;
}
