import { Box, styled, TextField, Typography, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Track } from "../../../models/track";

const SearchContainer = styled(Box)({
    padding: "16px",
    width: "100%",
    height: "100%",
    overflowY: "auto",

    "&::-webkit-scrollbar": {
        display: "none",
    },
    msOverflowStyle: "none",
    scrollbarWidth: "none",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",

    "& .MuiInputBase-root": {
        borderRadius: "4px",
        backgroundColor: theme.palette.action.active,
        color: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "transparent",
        },
        "&:hover fieldset": {
            borderColor: "gray",
        },
        "&.Mui-focused fieldset": {
            borderColor: "gray",
        },
    },
}));

const EmptyPlaylistWithSearch = () => {
    const [keyword, setKeyword] = useState<string>("");
    const {
        data,
        error,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Track],
    });

    const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []).filter((track): track is Track => track !== undefined) ?? [];
    const hasResults = tracks.length > 0;

    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    return (
        <SearchContainer>
            <Box display="inline-block" width="100%">
                <Typography variant="h1" my="10px">
                    Let's find something for your playlist
                </Typography>

                <StyledTextField
                    value={keyword}
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Search for songs or episodes"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ color: "white" }} />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleSearchKeyword}
                />
            </Box>
            <div>
                {isLoading ? (
                    <LoadingSpinner />
                ) : hasResults ? (
                    <SearchResultList
                        list={tracks}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        fetchNextPage={fetchNextPage}
                    />
                ) : keyword === "" ? (
                    <></>
                ) : (
                    <div>{`No Result for "${keyword}"`}</div>
                )}
            </div>
        </SearchContainer>
    );
};

export default EmptyPlaylistWithSearch;