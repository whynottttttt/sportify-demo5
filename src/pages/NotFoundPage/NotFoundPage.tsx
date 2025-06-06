import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router';

const NotFoundPage = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            textAlign="center"
        >
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                페이지를 찾을 수 없습니다
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                요청하신 페이지가 존재하지 않습니다.
            </Typography>
            <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
            >
                홈으로 돌아가기
            </Button>
        </Box>
    );
};

export default NotFoundPage;
