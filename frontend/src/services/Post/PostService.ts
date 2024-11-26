import { CreatePostRequest } from "../../types/Post/CreatePost.Request";
import { CreatePostResponse } from "../../types/Post/CreatePost.Response";
import { GlobalPostRequest } from "../../types/Post/GlobalPost.Request";
import { GlobalPostResponse } from "../../types/Post/GlobalPost.Response";
import { PostDetailsRequest } from "../../types/Post/PostDetails.Request";
import { PostCommentType, PostDetailsResponse } from "../../types/Post/PostDetails.Response";
import { PostType } from "../../types/Post/PostType";
import { Request } from "../../types/Request";
import { bird } from "../../utils/bird";
import { baseUrl } from "../baseUrl";

class PostService {

    async getGlobalPosts({ page = 0, authorization }: GlobalPostRequest) {
        const request = await bird<Request<GlobalPostResponse[]>>(
            {
                url: `${baseUrl}/post/global/${page}`,
                headers: { authorization },
            },
        );

        console.log(request);

        return request;
    };

    async getBublePosts({ page, authorization }: GlobalPostRequest) {
        const request = await bird<Request<PostType>>(
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

    async createPost({ text, authorization }: CreatePostRequest) {
        const request = await bird<Request<CreatePostResponse>>(
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

}

export default new PostService();