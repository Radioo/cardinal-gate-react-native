import {Redirect} from "expo-router";
import FullScreenLoader from "@/components/shared/feedback/FullScreenLoader";
import ErrorScreen from "@/components/shared/feedback/ErrorScreen";
import useAuthToken from "@/hooks/queries/useAuthToken";

export default function Root() {
    const {data: token, isPending, isError, error, refetch} = useAuthToken();

    if (isPending) {
        return <FullScreenLoader/>;
    }

    if (isError) {
        return <ErrorScreen error={error} onRetry={refetch}/>;
    }

    if (token !== null) {
        return <Redirect href="/main/home" />;
    }

    return <Redirect href="/login" />;
}
