import { Button, Card, styled, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import Playlist from "./Playlist";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";

const PlaylistContainer = styled("div")(({ theme }) => ({
    overflowY: "auto",
    maxHeight: "calc(100vh - 240px)",
    height: "100%",
    "&::-webkit-scrollbar": {
        display: "none",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
    },
    [theme.breakpoints.down("sm")]: {
        maxHeight: "calc(100vh - 65px - 119px)",
    },
}));
const Library = () => {
    const playlistContainerRef = useRef<HTMLDivElement>(null);
    const { ref, inView } = useInView({
        root: playlistContainerRef.current,
        rootMargin: '0px 0px 50px 0px', // 50px 여유를 두고 미리 로드
        threshold: 0
    });
    const {
        data,
        isLoading,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
    const { data: user } = useGetCurrentUserProfile();
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])
    if (!user) return <EmptyPlaylist />

    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (error) {
        return <ErrorMessage errorMessage={error.message} />;
    }


    return (
        <div>
            {!data || data?.pages[0].total === 0 ? (
                <EmptyPlaylist />
            ) : (
                <PlaylistContainer ref={playlistContainerRef}>
                    {data?.pages.map((page, index) => (
                        <Playlist playlists={page.items} key={index} />
                    ))}
                    <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>

                </PlaylistContainer>
            )}
        </div>
    );
};

export default Library;