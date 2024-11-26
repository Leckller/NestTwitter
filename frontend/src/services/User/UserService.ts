import { PostType, ProfileType } from "../../types/Post/PostType";
import { Request } from "../../types/Request";
import { LoginRequest } from "../../types/User/Login.Request";
import { LoginResponse } from "../../types/User/Login.Response";
import { RegisterRequest } from "../../types/User/Register.Request";
import { RegisterResponse } from "../../types/User/Register.Response";
import { bird } from "../../utils/bird";
import { baseUrl } from "../baseUrl";

class UserService {

    async login({ email, password }: LoginRequest) {
        const request = await bird<Request<LoginResponse>>(
            {
                url: `${baseUrl}/user/login`,
                method: 'POST',
                body: { email, password },
            },
        );

        return request;
    };


    async register({
        email, password, address, banner, name, photo,
    }: RegisterRequest) {
        const request = await bird<Request<RegisterResponse>>(
            {
                url: `${baseUrl}/user`,
                method: 'POST',
                body: {
                    email, password, address, banner, name, photo,
                },
            },
        );

        return request;
    };

    async followUser({ followedId, authorization }: { followedId: number, authorization: string }) {
        const request = await bird<Request<LoginResponse>>(
            {
                url: `${baseUrl}/follow`,
                method: 'POST',
                headers: { authorization },
                body: { followedId },
            },
        );

        return request;
    };

    async profile({ authorization, userId, page }: { page: number, userId: number, authorization: string }) {
        const request = await bird<Request<{ user: ProfileType, posts: PostType[] }>>(
            {
                url: `${baseUrl}/user/id/${userId}/${page}`,
                method: 'GET',
                headers: { authorization },
            },
        );

        return request;
    }

}

export default new UserService();