import {createHashRouter} from "react-router";
import {lazy} from "react";
import NavigatorLayout from "@/layout/navigatorlayout.tsx";

const router = createHashRouter([
    {
        Component: NavigatorLayout,
        children: [
            {
                index: true,
                Component: lazy(() => import("@/views"))
            },
            {
                path: "me",
                Component: lazy(() => import("@/views/me"))
            },
            {
                path: "articles/create",
                Component: lazy(() => import("@/views/articles/create"))
            },
            {
                path: "article/:id",
                Component: lazy(() => import("@/views/articles/detail"))
            },
            {
                path: "article/:id/edit",
                Component: lazy(() => import("@/views/articles/edit"))
            }
        ]
    },
]);


export default router