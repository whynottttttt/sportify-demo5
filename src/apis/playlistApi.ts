import { GetCurrentUserplaylistRequest, GetCurrentUserPlaylistResponse } from "../models/playlist"
import api from "../utils/api"

export const getCurrentUserPlaylists = async ({
    limit,
    offset
}: GetCurrentUserplaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
    try {
        const response = await api.get(`/me/playlists`, {
            params: { limit, offset }
        })
        return response.data;
    } catch (error) {
        throw new Error("fail to fetch current user playlists")
    }
}
