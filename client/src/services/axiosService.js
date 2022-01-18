import axios from "axios";
import jwt_decode from "jwt-decode";
import { RefreshToken } from './apiServices';

const axiosjwt = axios.create();

export const AxiosJwtInterceptor = async (user) => {
    axiosjwt.interceptors.request.use(
        async (config) => {
            console.log("test interceptor call: "+user);
            let currentDate = new Date();
            const decodedToken = jwt_decode(user.accessToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const data = await RefreshToken(user.refreshToken);
            console.log("test res data: "+data);
            config.headers["authorization"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}

