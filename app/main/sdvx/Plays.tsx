import useSdvxPlays from "@/hooks/queries/useSdvxPlays";
import SdvxPlayRow from "@/components/sdvx/SdvxPlayRow";
import PlaysPage from "@/components/shared/PlaysPage";
import {SdvxPlay} from "@/types/sdvx-play";

export default function Plays() {
    return (
        <PlaysPage<SdvxPlay>
            useQuery={useSdvxPlays}
            renderItem={(play) => <SdvxPlayRow play={play}/>}
        />
    );
}
