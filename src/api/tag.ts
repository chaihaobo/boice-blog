import {api} from "@/api/api.ts";

export interface Tag {
    id: number;
    name: string;
}

export const getTags = (q: string) => {
    return api.Get<Tag[]>('/tags', {
        params: {
            q
        }
    });
}; 