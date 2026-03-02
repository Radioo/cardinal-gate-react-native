import {RefreshControl, ScrollView} from "react-native";
import PlayCounts from "@/components/shared/PlayCounts";
import useSummary from "@/hooks/queries/useSummary";
import useUserRefresh from "@/hooks/useUserRefresh";

export default function Home() {
    const {refetch} = useSummary();
    const {refreshing, handleRefresh} = useUserRefresh(refetch);

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
        }>
            <PlayCounts/>
        </ScrollView>
    )
}
