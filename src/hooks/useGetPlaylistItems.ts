import { useInfiniteQuery } from "@tanstack/react-query"

import { GetPlaylistItemsRequest } from "../models/playlist"
import { getPlaylistItems } from "../apis/playlistApi"

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
    return useInfiniteQuery({
        queryKey: [`playlist-items`, params],
        queryFn: ({ pageParam }) => {
            return getPlaylistItems({ offset: pageParam, ...params })
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next)
                const nextOffset = url.searchParams.get("offset")
                return nextOffset ? parseInt(nextOffset) : undefined
            }
            return undefined
        },
        retry: false, // 재시도 비활성화
    })
}

export default useGetPlaylistItems