import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';

export const fetchUserAnswers = createAsyncThunk(
    'fetchUserAnswers',
    async (fields: { userId: number, authorization: string, page: number }) => {
        const response = await PostService.userAnswers(fields);
        return response;
    },
);

export function fetchUserAnswersBuilder(builder: ActionReducerMapBuilder<PostState>) {
    builder
        .addCase(fetchUserAnswers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUserAnswers.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.result.length <= 0) {
                return;
            }

            state.pages.answers += 1;
            state.profileAnswers = [...state.profileAnswers, ...action.payload.result];

        })
        .addCase(fetchUserAnswers.rejected, (state, action) => {
            state.loading = false;
            state.pages.answers -= 1;
            console.log(action);
        });
}