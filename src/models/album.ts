import { Artist } from "./artist";
import { ExternalUrls, image, Restriction } from "./commonType";

export interface GetNewReleasesResponse {
    albums: {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: string | null;
        total: number;
        items: SimplifiedAlbum[];
    }
}

export interface SimplifiedAlbum {
    album_type: string;
    total_tracks: string;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: Restriction;
    type: string;
    url: string;
    artists: Artist[];

}