import { PostType, ProfileType } from "../../types/Post/PostType";
import { Request } from "../../types/Request";
import { RegisterRequest } from "../../types/User/Register.Request";
import { bird } from "../../utils/bird";
import { baseUrl } from "../baseUrl";

class UserService {

    async login({ email, password }: { email: string, password: string }) {
        const request = await bird<Request<{ token: string, userId: number }>>(
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
        const request = await bird<Request<{ token: string, userId: number }>>(
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
        const request = await bird<Request<{ isFollowing: boolean }>>(
            {
                url: `${baseUrl}/follow`,
                method: 'POST',
                headers: { authorization },
                body: { followedId },
            },
        );

        return { ...request, followedId };
    };

    async profile({ authorization, userId }: { userId: number, authorization: string }) {
        const request = await bird<Request<{ user: ProfileType, posts: Omit<PostType, 'user'>[] }>>(
            {
                url: `${baseUrl}/user/id/${userId}`,
                method: 'GET',
                headers: { authorization },
            },
        );

        return request;
    }

    async userPosts({ authorization, userId, page }: { page: number, userId: number, authorization: string }) {
        const request = await bird<Request<{ posts: Omit<PostType, 'user'>[] }>>(
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