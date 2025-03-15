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
      console.log('Moving item:', { fromListId, toListId, itemId });
      
      // Find the source and destination lists
      const fromList = state.lists.find(list => list.list_number === fromListId || list.id === fromListId);
      const toList = state.lists.find(list => list.list_number === toListId || list.id === toListId);

      console.log('Found lists:', { 
        fromList: fromList?.list_number, 
        toList: toList?.list_number 
      });

      if (fromList && toList) {
        const itemIndex = fromList.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          const [item] = fromList.items.splice(itemIndex, 1);
          toList.items.push(item);
          console.log('Moved item:', { 
            item: item.name, 
            fromList: fromList.list_number, 
            toList: toList.list_number 
          });
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        // The API returns individual items, not lists with items
        // We need to group them by list_number
        const list1Items = action.payload
          .filter(item => item.list_number === 1)
          .map(item => ({
            id: item.id,
            name: item.name,
            description: item.description
          }));
          
        const list2Items = action.payload
          .filter(item => item.list_number === 2)
          .map(item => ({
            id: item.id,
            name: item.name,
            description: item.description
          }));
        
        // Create properly structured lists
        const transformedLists = [
          { id: 1, list_number: 1, items: list1Items },
          { id: 2, list_number: 2, items: list2Items },
          { id: 3, list_number: 3, items: [] }
        ];
        
        state.lists = transformedLists;
        console.log('Transformed lists:', transformedLists);
      })
      .addCase(getLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { moveItem } = listSlice.actions;
export default listSlice.reducer;