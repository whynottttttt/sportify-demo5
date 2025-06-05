import axios from "axios"
import { clientId, clientSecret } from "../configs/authConfig"
import { ClientCredentialTokenResponse } from "../models/auth"

const encodedBase64 = (data: string): string => {
    if (typeof window !== "undefined") {
        // 브라우저 환경
        return btoa(data);
    } else {
        // Node.js 환경 (서버 사이드 렌더링 등)
        return Buffer.from(data).toString("base64");
    }
}

export const getClientCredientialToken = async (): Promise<ClientCredentialTokenResponse> => {
    try {
        const body = new URLSearchParams({
            grant_type: "client_credentials"
        })
        const response = await axios.post("https://accounts.spotify.com/api/token", body, {
            headers: {
                Authorization: `Basic ${encodedBase64(clientId + ":" + clientSecret)}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return response.data
    } catch (error) {
        throw new Error("Fail to fetch client credential token");

    }
}