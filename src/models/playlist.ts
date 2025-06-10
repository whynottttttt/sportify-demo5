import { ApiResponse } from "./apiResponse"
import { ExternalUrls, Image, Owner } from "./commonType";

export interface GetCurrentUserplaylistRequest {
    limit?: number,
    offset?: number
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>

export interface SimplifiedPlaylist {
    collaborative?: boolean;
    description?: string;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean;
    snapshot_id?: string;
    tracks?: {
        href?: string;
        total?: number;
    }
    uri?: string;
}

export interface GetPlaylistRequest {
    playlist_Id: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}