import {createBrowserRouter} from "react-router";
import Layout from "@/layout/layout.tsx";
import Index from "@/views";
import Me from "@/views/me.tsx";
import CreateArticle from "@/views/airticles/create.tsx";

const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {
                index: true,
                Component: Index
            },
            {
                path: "me",
                Component: Me
            },
            {
                path: "admin/article/new",
                Component: CreateArticle
            }
        ]
    },
]);

export default router