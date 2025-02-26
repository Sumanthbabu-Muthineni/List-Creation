import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLists } from '../../services/api';

export const getLists = createAsyncThunk('list/getLists', async () => {
  const response = await fetchLists();
  return response;
});

const listSlice = createSlice({
  name: 'list',
  initialState: {
    lists: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    moveItem: (state, action) => {
      const { fromListId, toListId, itemId } = action.payload;
      const fromList = state.lists.find((list) => list.id === fromListId);
      const toList = state.lists.find((list) => list.id === toListId);
      const item = fromList.items.find((item) => item.id === itemId);

      fromList.items = fromList.items.filter((item) => item.id !== itemId);
      toList.items.push(item);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = action.payload;
      })
      .addCase(getLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { moveItem } = listSlice.actions;
export default listSlice.reducer;
