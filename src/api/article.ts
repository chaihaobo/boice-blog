import {api} from './api';

export interface Article {
    id: number;
    title: string;
    tags: string[];
    description: string;
    created_at: string;
}

export interface ArticleListResponse {
    data: Article[];
    total: number;
}

export const getArticles = (page: number, size: number) => {
    return api.Get<ArticleListResponse>(`/articles?page=${page}&size=${size}`);
}; 