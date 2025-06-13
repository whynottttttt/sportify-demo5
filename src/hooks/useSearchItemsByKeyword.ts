import { LastPage } from "@mui/icons-material"
import { useInfiniteQuery } from "@tanstack/react-query"
import { searchItemsByKeyword } from "../apis/searchApi"
import { SearchRequestParams } from "../models/search"
import useClientCredentialToken from "./useClientCredentialToken"

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
    const clientCredentialToken = useClientCredentialToken();
    return useInfiniteQuery({
        queryKey: ["search", params],
        queryFn: ({ pageParam = 0 }) => {
            if (!clientCredentialToken) throw new Error("no token available")
            return searchItemsByKeyword(clientCredentialToken, {
                ...params,
                offset: pageParam,
            });
        },
        initialPageParam: 0,
        enabled: !!params.q,
        getNextPageParam: (lastPage) => {
            const nextPageUrl =
                lastPage.tracks?.next ||
                lastPage.artists?.next ||
                lastPage.albums?.next ||
                lastPage.playlists?.next ||
                lastPage.shows?.next ||
                lastPage.episodes?.next ||
                lastPage.audiobooks?.next;

            if (nextPageUrl) {
                const nextOffset = new URL(nextPageUrl).searchParams.get("offset")
                return nextOffset ? parseInt(nextOffset) : undefined
            }
            return undefined;


        }
    })
}

export default useSearchItemsByKeyword