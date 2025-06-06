import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import useExchangeToken from '../../hooks/useExchangeToken';
import { useNavigate } from 'react-router-dom';

const CallbackPage = () => {
    const [status, setStatus] = useState('처리 중...');
    const { mutate: exchangeToken, isSuccess, isError } = useExchangeToken();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
            setStatus('인증이 취소되었습니다.');
            setTimeout(() => navigate('/'), 2000);
            return;
        }

        if (code) {
            const codeVerifier = localStorage.getItem('code_verifier');
            console.log('Authorization code:', code.substring(0, 20) + '...');

            if (codeVerifier) {
                setStatus('토큰 교환 중...');
                exchangeToken({ code, codeVerifier });
                localStorage.removeItem('code_verifier');
            } else {
                setStatus('인증 정보가 없습니다. 다시 로그인해주세요.');
                setTimeout(() => navigate('/'), 2000);
            }
        }
    }, [exchangeToken, navigate]);

    useEffect(() => {
        if (isSuccess) {
            setStatus('로그인 성공! 홈으로 이동합니다...');
            setTimeout(() => navigate('/'), 1500);
        }
        if (isError) {
            setStatus('로그인 실패. 다시 시도해주세요.');
            setTimeout(() => navigate('/'), 2000);
        }
    }, [isSuccess, isError, navigate]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <LoadingSpinner text="Spotify 인증 처리 중..." />
            <Typography variant="body2" color="text.secondary" mt={2}>
                {status}
            </Typography>
        </Box>
    );
};

export default CallbackPage;
