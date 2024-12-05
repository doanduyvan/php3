import {
    GET_POSTS,
    CHANGE_PAGE,
    CHANGE_PAGE_SIZE,
    CHANGE_STATUS,
    TOTAL_ITEMS
} from './constants';

export const initialState = {
    posts: [],
    currentPage: 1,
    totalItems: 0,
    pageSize: 5,
    status: 0,
    statusNames: {
      0 : 'Chờ duyệt',
      1 : 'Đã duyệt',
      2 : 'Từ chối',
      3 : 'Bị hủy'
    }
};

const PostReducer = (state,action) =>{
    const type = action.type;
    const payload = action.payload;
    switch(type){
        case GET_POSTS:
            return {
                ...state,
                posts: payload
            }
        case CHANGE_PAGE:
            return {
                ...state,
                currentPage: payload
            }
        case CHANGE_PAGE_SIZE:
            return {
                ...state,
                pageSize: payload
            }
        case CHANGE_STATUS:
            return {
                ...state,
                currentPage: 1,
                status: payload
            }
        case TOTAL_ITEMS:
            return {
                ...state,
                totalItems: payload
            }
        default:
            return state;
    }
}

export default PostReducer;