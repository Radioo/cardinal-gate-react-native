import useSdvxPlays from "@/hooks/queries/useSdvxPlays";
import SdvxPlayRow from "@/components/sdvx/SdvxPlayRow";
import PlaysPage from "@/components/shared/layout/PlaysPage";
import {SdvxPlay} from "@/types/sdvx-play";

export default function Plays() {
    return (
        <PlaysPage<SdvxPlay>
            usePlaysQuery={useSdvxPlays}
            renderItem={(play) => <SdvxPlayRow play={play}/>}
        />
    );
}
