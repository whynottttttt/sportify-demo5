import React, { useEffect, useRef } from 'react'
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Grid, styled, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@mui/material';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../../common/components/LoadingSpinner';

const PlaylistHeader = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
    padding: "16px",
    gap: "16px",

    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "12px",
    },
}));
const ImageGrid = styled(Grid)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,

    [theme.breakpoints.down("md")]: {
        width: "100%",
        marginBottom: "8px",
    },
}));
const AlbumImage = styled("img")(({ theme }) => ({
    borderRadius: "8px",
    height: "200px",
    width: "200px",
    objectFit: "cover",

    [theme.breakpoints.down("md")]: {
        height: "150px",
        width: "150px",
    },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
    fontSize: "3rem",
    textAlign: "left",
    wordBreak: "break-word",
    lineHeight: 1.2,
    overflow: "hidden",
    textOverflow: "ellipsis",

    [theme.breakpoints.down("md")]: {
        fontSize: "2rem",
        textAlign: "center",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
        textAlign: "center",
    },
}));

const DefaultImage = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    backgroundColor: '#333',
    height: '200px',
    width: '200px',

    [theme.breakpoints.down("md")]: {
        height: "150px",
        width: "150px",
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    background: theme.palette.background.paper,
    color: theme.palette.common.white,
    height: "calc(100% - 64px)",
    borderRadius: "8px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
        display: "none",
    },
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
}));

const PlaylistDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    if (id === undefined) return <Navigate to="/" />;
    const { data: playlist } = useGetPlaylist({ playlist_Id: id })

    const { data: playlistItems, isLoading: IsPlaylistItemsLoading, error: playlistItemsLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetPlaylistItems({ playlist_Id: id, limit: PAGE_LIMIT })
    console.log("ddd", playlistItems);

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [ref, inView] = useInView({
        root: tableContainerRef.current,
        rootMargin: '0px 0px 100px 0px', // 100px 여유를 두고 미리 로드
        threshold: 0
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <>
            <PlaylistHeader>
                <ImageGrid>
                    {playlist?.images ? (
                        <AlbumImage
                            src={playlist?.images[0].url}
                            alt="playlist_cover.jpg"
                        />
                    ) : (
                        <DefaultImage>
                            <MusicNoteIcon fontSize="large" />
                        </DefaultImage>
                    )}
                </ImageGrid>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <ResponsiveTypography variant="h1" color="white">
                        {playlist?.name}
                    </ResponsiveTypography>

                    <Box display="flex" alignItems="center" flexWrap="wrap" sx={{ mt: 1 }}>
                        <img
                            src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                            width="20px"
                        />
                        <Typography
                            variant="subtitle1"
                            color="white"
                            ml={1}
                            fontWeight={700}
                        >
                            {playlist?.owner?.display_name
                                ? playlist?.owner.display_name
                                : "unknown"}
                        </Typography>
                        <Typography variant="subtitle1" color="white">
                            • {playlist?.tracks?.total} songs
                        </Typography>
                    </Box>
                </Box>
            </PlaylistHeader>
            {
                playlist?.tracks.total === 0 ? (<Typography>써치</Typography>) : (
                    <>
                        <StyledTableContainer ref={tableContainerRef}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Album</TableCell>
                                        <TableCell>Date added</TableCell>
                                        <TableCell>Duration</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {playlistItems?.pages.map((page, pageIndex) =>
                                        page.items.map((item, itemIndex) => {
                                            return <DesktopPlaylistItem
                                                item={item}
                                                key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                                                index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                                            />
                                        }))}
                                    <TableRow sx={{ height: "5px" }} ref={ref} />
                                    {isFetchingNextPage && <LoadingSpinner />}
                                </TableBody>
                            </Table>
                        </StyledTableContainer>
                    </>
                )
            }
        </>
    )
}

export default PlaylistDetailPage