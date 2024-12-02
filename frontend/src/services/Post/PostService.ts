import { GlobalPostRequest } from "../../types/Post/GlobalPost.Request";
import { PostDetailsRequest } from "../../types/Post/PostDetails.Request";
import { PostCommentType, PostDetailsResponse } from "../../types/Post/PostDetails.Response";
import { CreatePostType, PostType, UserSearch } from "../../types/Post/PostType";
import { Request } from "../../types/Request";
import { bird } from "../../utils/bird";
import { baseUrl } from "../baseUrl";

class PostService {

    async getGlobalPosts({ page = 0, authorization }: GlobalPostRequest) {
        const request = await bird<Request<PostType[]>>(
            {
                url: `${baseUrl}/post/global/${page}`,
                headers: { authorization },
            },
        );

        console.log(request);

        return request;
    };

    async getBubblePosts({ page, authorization }: GlobalPostRequest) {
        const request = await bird<Request<PostType[]>>(
            {
                url: `${baseUrl}/follow/circle/${page}`,
                headers: { authorization },
            },
        );

        console.log(request);
        return request;
    };


    async getPostDetails({ id, authorization }: PostDetailsRequest) {
        const request = await bird<Request<PostDetailsResponse>>(
            {
                url: `${baseUrl}/post/details/${id}`,
                headers: { authorization },
            },
        );

        console.log(request);
        return request;
    };


    async getPostComments({ postId, authorization, page }: { postId: number, authorization: string, page: number }) {
        const request = await bird<Request<{ postComments: PostCommentType[] }>>(
            {
                url: `${baseUrl}/post/comments/${postId}/${page}`,
                headers: { authorization },
            },
        );

        console.log(request);
        return request;
    };

    async createPost({ text, authorization }: { text: string, authorization: string }) {
        const request = await bird<Request<CreatePostType>>(
            {
                url: `${baseUrl}/post`,
                headers: { authorization },
                body: { text },
                method: 'POST',
            },
        );

        console.log(request);
        return request;
    };


    async createComment({ text, postId, authorization }: { text: string, postId: number, authorization: string }) {
        const request = await bird<Request<{ postId: number, comment: PostCommentType }>>(
            {
                url: `${baseUrl}/comment`,
                headers: { authorization },
                body: { text, postId },
                method: 'POST',
            },
        );

        console.log(request);
        return request;
    };

    async likePost({ postId, authorization }: { postId: number, authorization: string }) {
        const request = await bird<Request<{ postId: number, removed: boolean }>>(
            {
                url: `${baseUrl}/like`,
                headers: { authorization },
                body: { postId },
                method: 'POST',
            },
        );

        console.log(request);
        return request;
    };

    async search({ text, authorization }: { text: string, authorization: string }) {
        const request = await bird<Request<{ posts: PostType[], users: UserSearch[] }>>(
            {
                url: `${baseUrl}/search/${text}`,
                headers: { authorization },
                method: 'GET',
            },
        );

        console.log(request);
        return request;
    };

    async searchPosts({ page, text, authorization }: { page: number, text: string, authorization: string }) {
        const request = await bird<Request<{ posts: PostType[] }>>(
            {
                url: `${baseUrl}/search/posts/${text}/${page}`,
                headers: { authorization },
                method: 'GET',
            },
        );

        console.log(request);
        return request;
    };

    async searchUsers({ page, text, authorization }: { page: number, text: string, authorization: string }) {
        const request = await bird<Request<{ users: UserSearch[] }>>(
            {
                url: `${baseUrl}/search/users/${text}/${page}`,
                headers: { authorization },
                method: 'GET',
            },
        );

        console.log(request);
        return request;
    };


    async userAnswers({ page, userId, authorization }: { page: number, userId: number, authorization: string }) {
        const request = await bird<Request<{ id: number, post: PostType, comment: PostType }[]>>(
            {
                url: `${baseUrl}/comment/${page}/${userId}`,
                headers: { authorization },
                method: 'GET',
            },
        );

        console.log(request);
        return request;
    };


}

export default new PostService();