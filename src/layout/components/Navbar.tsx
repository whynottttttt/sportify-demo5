import { Box, Avatar, IconButton, Menu, MenuItem, styled } from '@mui/material'
import React, { useState } from 'react'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'

const ProfileContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "8px",
});

const ProfileMenu = styled(Menu)({
    "& .MuiPaper-root": {
        color: "white",
        minWidth: "160px",
    },
});

const ProfileMenuItem = styled(MenuItem)({
    "&:hover": {
        backgroundColor: "#444",
    },
});

const Navbar = () => {
    const { data: userProfile } = useGetCurrentUserProfile()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        handleMenuClose()
        window.location.reload()
    }

    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
            {userProfile ? (
                <ProfileContainer>
                    <IconButton onClick={handleMenuOpen} size="small">
                        <Avatar
                            src={userProfile.images[0]?.url}
                            alt={userProfile.display_name}
                        />
                    </IconButton>
                    <ProfileMenu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        keepMounted
                    >
                        <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
                    </ProfileMenu>
                </ProfileContainer>
            ) : (
                <LoginButton />
            )}
        </Box>
    )
}

export default Navbar