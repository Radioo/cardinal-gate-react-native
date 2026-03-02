import useIidxPlays from "@/hooks/queries/useIidxPlays";
import IidxPlayRow from "@/components/iidx/IidxPlayRow";
import PlaysPage from "@/components/shared/PlaysPage";
import {IidxPlay} from "@/types/iidx-play";

export default function Plays() {
    return (
        <PlaysPage<IidxPlay>
            useQuery={useIidxPlays}
            renderItem={(play) => <IidxPlayRow play={play}/>}
        />
    );
}
