import {ReactElement, useState} from "react";
import {UseQueryResult} from "@tanstack/react-query";
import PaginatedPlaysList from "@/components/shared/PaginatedPlaysList";

type PlaysResponse<T> = {
    plays: T[];
    pages: number;
}

type PlaysPageProps<T> = {
    useQuery: (page: number) => UseQueryResult<PlaysResponse<T>>;
    renderItem: (play: T) => ReactElement;
}

export default function PlaysPage<T>({useQuery, renderItem}: PlaysPageProps<T>) {
    const [page, setPage] = useState(1);
    const {data, isPending, isError, error, refetch} = useQuery(page);

    return (
        <PaginatedPlaysList<T>
            plays={data?.plays ?? []}
            pages={data?.pages ?? 1}
            isPending={isPending}
            isError={isError}
            error={error}
            refetch={refetch}
            page={page}
            onPageChange={setPage}
            renderItem={renderItem}
        />
    );
}
