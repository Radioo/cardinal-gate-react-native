import {SdvxClearType} from "@/enums/sdvx-clear-type";
import {Text, View} from "react-native";
import {useTheme} from "@/hooks/useTheme";
import {darken, lighten} from "polished";

type SdvxClearTypeItemProps = {
    clearType: SdvxClearType;
}

export default function SdvxClearTypeItem(props: SdvxClearTypeItemProps) {
    const theme = useTheme();

    const getText = (clearType: SdvxClearType) => {
        switch(clearType) {
            case SdvxClearType.NO_PLAY:
                return 'NO PLAY';
            case SdvxClearType.PLAYED:
                return 'PLAYED';
            case SdvxClearType.COMPLETE:
                return 'COMPLETE';
            case SdvxClearType.EXCESSIVE_COMPLETE:
                return 'EXCESSIVE COMPLETE';
            case SdvxClearType.ULTIMATE_CHAIN:
                return 'ULTIMATE CHAIN';
            case SdvxClearType.PERFECT_ULTIMATE_CHAIN:
                return 'PUC';
        }
    }

    const getColor = (clearType: SdvxClearType) => {
        switch(clearType) {
            case SdvxClearType.NO_PLAY:
            case SdvxClearType.PLAYED:
                return '#808080';
            case SdvxClearType.COMPLETE:
                return '#39853D';
            case SdvxClearType.EXCESSIVE_COMPLETE:
                return '#8f30d7';
            case SdvxClearType.ULTIMATE_CHAIN:
                return '#B0283D';
            case SdvxClearType.PERFECT_ULTIMATE_CHAIN:
                return '#b2af00';
        }
    }

    let backgroundColor: string;
    let borderColor: string;

    if(theme.scheme === 'dark') {
        backgroundColor = darken(0.2, getColor(props.clearType));
        borderColor = lighten(0.2, getColor(props.clearType));
    }
    else {
        backgroundColor = lighten(0.25, getColor(props.clearType));
        borderColor = darken(0.25, getColor(props.clearType));
    }

    return (
        <View style={{alignSelf: 'flex-start'}}>
            <Text style={{
                color: theme.text,
                backgroundColor: backgroundColor,
                borderWidth: 2,
                borderColor: borderColor,
                paddingHorizontal: 5,
                fontWeight: 'bold',
            }}>
                {getText(props.clearType)}
            </Text>
        </View>
    )
}
