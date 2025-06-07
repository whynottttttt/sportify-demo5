import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getCureentUserProfile } from "../apis/userApi"
import { User } from "../models/user"

const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
    const accessToken = localStorage.getItem("access_token")
    return useQuery({
        queryKey: ['current-user-profil'],
        queryFn: getCureentUserProfile,
        enabled: !!accessToken,

    })
}

export default useGetCurrentUserProfile