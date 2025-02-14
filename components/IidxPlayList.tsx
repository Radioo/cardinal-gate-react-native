import {IidxPlay} from "@/types/iidx-play";
import {FlatList, View} from "react-native";
import IidxPlayRow from "@/components/IidxPlayRow";
import type * as React from "react";
import {RefreshControlProps} from "react-native/Libraries/Components/RefreshControl/RefreshControl";

type IidxPlayListProps = {
    plays: IidxPlay[];
    refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

export default function IidxPlayList({plays, refreshControl}: IidxPlayListProps) {
    return (
        <FlatList data={plays} refreshControl={refreshControl} renderItem={({item}) => (
            <View style={{margin: 5}}>
                <IidxPlayRow play={item}/>
            </View>
        )}/>
    )
}
