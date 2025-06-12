import { CreatePlaylistRequest, GetCurrentUserplaylistRequest, GetCurrentUserPlaylistResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, GetPlaylistRequest, Playlist } from "../models/playlist"
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

export const getPlaylist = async (params: GetPlaylistRequest): Promise<Playlist> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_Id}`, {
            params,
        })
        return response.data;
    } catch (error) {
        throw error; // 원본 axios 에러를 그대로 던짐
    }
}

export const getPlaylistItems = async (params: GetPlaylistItemsRequest): Promise<GetPlaylistItemsResponse> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_Id}/tracks`, {
            params
        });
        return response.data;
    } catch (error) {
        throw error; // 원본 axios 에러를 그대로 던짐
    }
}

export const CreatePlaylist = async (
    user_id: string,
    params: CreatePlaylistRequest
): Promise<Playlist> => {
    try {
        const { name, playlistPublic, collaboration, description } = params
        const response = await api.post(`/users/${user_id}/playlists`, {
            name,
            public: playlistPublic,
            collaboration,
            description
        })
        return response.data
    } catch (error) {
        throw new Error("fail to create playlist")
    }
}
