import {api} from './api';

export interface Article {
    id: number;
    title: string;
    tags: string[];
    raw_tags: Tag[]
    description: string;
    created_at: string;
    content: string;
}

export interface ArticleListResponse {
    data: Article[];
    total: number;
}

export const getArticles = (page: number, size: number) => {
    return api.Get<ArticleListResponse>(`/articles?page=${page}&size=${size}`);
};

export interface Tag {
    id: number;
    name: string;
}

export interface CreateArticleRequest {
    title: string;
    description: string;
    content: string;
    tags: Tag[];
}

export interface EditArticleRequest {
    title: string;
    description: string;
    content: string;
    tags: Tag[];
}

export const createArticle = (data: CreateArticleRequest) => {
    return api.Post<Article>('/articles', data);
};

export const getArticle = (id: number) => {
    return api.Get<Article>(`/articles/${id}`);
};

export const editArticle = (id: number, data: EditArticleRequest) => {
    return api.Put<Article>(`/articles/${id}`, data);
};