import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreatePlaylist } from "../apis/playlistApi"
import useGetCurrentUserProfile from "./useGetCurrentUserProfile"
import { CreatePlaylistRequest } from "../models/playlist"

const useCreatePlaylist = () => {
    const queryClient = useQueryClient()
    const { data: user } = useGetCurrentUserProfile()
    return useMutation({
        mutationFn: (params: CreatePlaylistRequest) => {
            if (user) {
                return CreatePlaylist(user.id, params);
            }
            return Promise.reject(new Error("user is not defined"))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] })
            console.log("성공")
        },
    })

}
export default useCreatePlaylist;