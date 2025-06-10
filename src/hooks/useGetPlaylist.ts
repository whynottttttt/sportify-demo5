import { useQuery } from "@tanstack/react-query"
import { GetPlaylistRequest } from "../models/playlist"
import { getPlaylist } from "../apis/playlistApi";

const useGetPlaylist = (params: GetPlaylistRequest) => {
    return useQuery({
        queryKey: [`playlist.detail`, params.playlist_Id],
        queryFn: () => {
            return getPlaylist(params);
        },
        enabled: !!params.playlist_Id,
    })
}
export default useGetPlaylist;