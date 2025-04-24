import {api} from "@/api/api.ts";

export interface Tag {
    id: number;
    name: string;
}

export const getTags = () => {
    return api.get<Tag[]>('/tags');
}; 