import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse"
import { Artist } from "./artist";
import { ExternalUrls, Followers, Image, Owner, Restriction } from "./commonType";
import { Track } from "./track";

export interface GetCurrentUserplaylistRequest {
    limit?: number,
    offset?: number
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>

// SimplifiedPlaylist tracks
// Playlist tracks followers
export interface BasePlaylist {
    collaborative?: boolean;
    description?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean;
    snapshot_id?: string;
    type?: "playlist";
    uri?: string;
}
export interface SimplifiedPlaylist extends BasePlaylist {
    tracks?: {
        href?: string;
        total?: number;
    }

}

export interface Playlist extends BasePlaylist {
    tracks: ApiResponse<PlaylistTrack>
    followers: Followers;
}

export interface GetPlaylistRequest {
    playlist_Id: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}


export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
    offset?: number;
    limit?: number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface Show {
    available_markets?: string[];
    copyrights?: Copyright[];
    description?: string;
    html_description?: string;
    explicit?: boolean;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    is_externally_hosted?: boolean | null;
    languages?: string[];
    media_type?: string;
    name?: string;
    publisher?: string;
    type?: "show";
    uri?: string;
    total_episodes?: number;
}

export interface Copyright {
    text?: string;
    type?: "C" | "P"; // C = copyright, P = sound recording (performance) copyright
}

export interface ResumePoint {
    fully_played?: boolean;
    resume_position_ms?: number;
}





export interface Episode {
    audio_preview_url?: string | null;
    description?: string;
    html_description?: string;
    duration_ms?: number;
    explicit?: boolean;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    is_externally_hosted?: boolean;
    is_playable?: boolean;
    languages?: string[];
    name?: string;
    release_date?: string;
    release_date_precision?: "year" | "month" | "day";
    resume_point?: ResumePoint;
    type?: "episode";
    uri?: string;
    restrictions?: Restriction;
    show?: Show;
}


export interface PlaylistTrack {
    added_at?: string | null;
    added_by?: {
        external_urls?: ExternalUrls;
        followers?: Followers;
        href?: string;
        id?: string;
        type?: string;
        uri?: string;
    } | null;
    is_local?: boolean;
    track: Track | Episode;
}