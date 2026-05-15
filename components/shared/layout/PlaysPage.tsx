import {ReactElement, useState} from "react";
import {UseQueryResult} from "@tanstack/react-query";
import PaginatedPlaysList from "@/components/shared/layout/PaginatedPlaysList";

type PlaysResponse<T> = {
    plays: T[];
    pages: number;
}

type PlaysPageProps<T> = {
    usePlaysQuery: (page: number) => UseQueryResult<PlaysResponse<T>>;
    renderItem: (play: T) => ReactElement;
}

export default function PlaysPage<T>({usePlaysQuery, renderItem}: PlaysPageProps<T>) {
    const [page, setPage] = useState(1);
    const query = usePlaysQuery(page);

    const baseProps = {
        plays: query.data?.plays ?? [],
        pages: query.data?.pages ?? 1,
        isPending: query.isPending,
        refetch: query.refetch,
        page,
        onPageChange: setPage,
        renderItem,
    };

    if (query.isError) {
        return <PaginatedPlaysList<T> {...baseProps} isError={true} error={query.error}/>;
    }
    return <PaginatedPlaysList<T> {...baseProps} isError={false} error={null}/>;
}
