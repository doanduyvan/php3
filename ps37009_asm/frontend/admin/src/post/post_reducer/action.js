import {
    GET_POSTS,
    CHANGE_PAGE,
    CHANGE_PAGE_SIZE,
    CHANGE_STATUS,
    TOTAL_ITEMS
} from './constants';

export const getPost = payload => ({
    type: GET_POSTS,
    payload
});

export const changePage = payload => ({
    type: CHANGE_PAGE,
    payload
});

export const changePageSize = payload => ({
    type: CHANGE_PAGE_SIZE,
    payload
});

export const chageStatus = payload => ({
    type: CHANGE_STATUS,
    payload
});

export const setTotalItems = payload => ({
    type: TOTAL_ITEMS,
    payload
});