import {IidxClearType} from "@/enums/iidx-clear-type";
import {ThemedText} from "@/components/ThemedText";

export type IidxClearTypeProps = {
    clearType: IidxClearType;
}

export default function IidxClearTypeItem({clearType}: IidxClearTypeProps) {
    const getColor = (clearType: IidxClearType) => {
        switch(clearType) {
            case IidxClearType.NO_PLAY:
                return '#000000';
            case IidxClearType.FAILED:
                return '#ff0000';
            case IidxClearType.ASSIST_CLEAR:
                return '#ff00ff';
            case IidxClearType.EASY_CLEAR:
                return '#00ff00';
            case IidxClearType.CLEAR:
                return '#00ffff';
            case IidxClearType.HARD_CLEAR:
                return '#0000ff';
            case IidxClearType.EX_HARD_CLEAR:
                return '#ffff00';
            case IidxClearType.FULL_COMBO:
                return '#ff8800';
        }
    }

    return (
        <ThemedText style={{
            backgroundColor: getColor(clearType),
            padding: 2
        }}>{clearType}</ThemedText>
    )
}
