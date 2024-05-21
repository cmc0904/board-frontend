import { configureStore, createSlice } from '@reduxjs/toolkit'

let boardList = createSlice({
    name : "boardList",
    initialState: {
        currentPage : 1,
        searchMode: "TITLE",
        content: "답",
        startDate: "",
        endDate:""
    },
    reducers: {
        changeBoardList(state, action) {
            state.currentPage = action.payload.currentPage;
            state.searchMode = action.payload.searchMode;
            state.content = action.payload.content;
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
        }
    }
})

export let { changeBoardList } = boardList.actions;

export default configureStore({
	reducer: {
        boardList: boardList.reducer,
    }
})