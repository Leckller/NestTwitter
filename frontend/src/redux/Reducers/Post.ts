import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCreatePostBuilder } from '../Thunks/Post/CreatePostThunk';
import { fetchGlobalPostsBuilder } from '../Thunks/Post/GlobalPostsThunk';
import { fetchPostDetailsBuilder } from '../Thunks/Post/PostDetailsThunk';
import { PostDetailsResponse } from '../../types/Post/PostDetails.Response';
import { fetchLikePostBuilder } from '../Thunks/Post/LikePostThunk';
import { fetchCreateCommentBuilder } from '../Thunks/Post/CreateCommentThunk';
import { PostType, ProfileType, UserSearch } from '../../types/Post/PostType';
import { fetchBubblePostsBuilder } from '../Thunks/Post/BubblePostsThunk';
import { fetchProfileBuilder } from '../Thunks/User/ProfileThunk';
import { fetchFollowBuilder } from '../Thunks/User/FollowThunk';
import { fetchSearchBuilder } from '../Thunks/Post/Search/SearchThunk';
import { fetchSearchPostsBuilder } from '../Thunks/Post/Search/SearchPostsThunk';
import { fetchSearchUsersBuilder } from '../Thunks/Post/Search/SearchUsersThunk';
import { fetchPostCommentsBuilder } from '../Thunks/Post/PostCommentsThunk';
import { fetchUserPostsBuilder } from '../Thunks/User/UserPostsThunk';
import { fetchUserAnswersBuilder } from '../Thunks/Post/UserAnswers';

export type LocalPostType = 'details' | 'global' | 'bubble' | 'profile' | 'searchUsers' | 'searchPosts' | 'likes' | 'answers'
export type PagesType = {
  bubble: number,
  global: number,
  profile: number,
  details: number,
  searchPosts: number,
  searchUsers: number,
  answers: number,
  likes: number,
}

export interface PostState {
  loading: boolean;

  posts: PostType[];
  bubblePosts: PostType[];

  // search
  search: { posts: PostType[], users: UserSearch[] };
  searchText: string;

  pages: PagesType,

  postDetails: PostDetailsResponse | undefined;

  localPost: LocalPostType,

  // Para criaçao de post/comentário
  newPost: boolean,
  isComment: boolean,
  postId: number

  // Profile
  profile: { user: ProfileType, posts: Omit<PostType, 'user'>[] } | undefined
  profileLikes: [],
  profileAnswers: { id: number, comment: PostType, post: PostType }[]
}

const initialState: PostState = {
  newPost: false,

  loading: false,

  isComment: false,

  pages: { bubble: 0, global: 0, profile: 0, details: 0, searchPosts: 0, searchUsers: 0, answers: 0, likes: 0 },

  postDetails: undefined,
  search: { posts: [], users: [] },

  profile: undefined,
  profileAnswers: [],
  profileLikes: [],

  posts: [],
  bubblePosts: [],

  postId: 0,
  localPost: 'bubble',

  searchText: ''
};

export const PostSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setComment(state, action: PayloadAction<{ postId: number, isComment: boolean }>) {
      state.isComment = action.payload.isComment;
      state.postId = action.payload.postId;
    },
    setPage(state, { payload: { page, type } }: PayloadAction<{ type: LocalPostType, page: number }>) {
      state.pages = { ...state.pages, [type]: page };
    },
    setNewPost(state, action: PayloadAction<boolean>) {
      state.newPost = action.payload;
    },
    setLocalPosts(state, action: PayloadAction<LocalPostType>) {
      state.localPost = action.payload;
    }
  },
  extraReducers: (builder) => {

    // Busca as postagens da respectiva rota
    fetchPostDetailsBuilder(builder);
    fetchGlobalPostsBuilder(builder);
    fetchBubblePostsBuilder(builder);
    fetchProfileBuilder(builder);

    // Curte um post
    fetchLikePostBuilder(builder);

    // Criar comentário ou postagem
    fetchCreatePostBuilder(builder);
    fetchCreateCommentBuilder(builder);

    // Comentários de um usuário
    fetchUserAnswersBuilder(builder);

    // Seguir usuário
    fetchFollowBuilder(builder);

    // Busca padrão da rota de pesquisa, pesquisa posts, usuários
    fetchSearchBuilder(builder);
    fetchSearchPostsBuilder(builder);
    fetchSearchUsersBuilder(builder);

    // Paginação dos comentários e usuário
    fetchPostCommentsBuilder(builder);
    fetchUserPostsBuilder(builder);
  },
});

export const { setPage, setNewPost, setComment, setLocalPosts, setSearchText } = PostSlice.actions;

export default PostSlice.reducer;
