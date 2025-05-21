import {FC, Suspense} from "react";
import {Outlet} from "react-router";
import {addToast, Spinner} from "@heroui/react";
import BlogNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "../utils/toast"
import {useNavigator} from "@/components/NavigatorProvider.tsx";
import ArticleSkeleton from "@/components/ArticleSkeleton";

const Layout: FC = () => {
    toast.set((props) => {
        addToast({
            ...props
        })
    })
    const {isPending} = useNavigator();

    return (
        <div className="min-h-screen flex flex-col">
            <BlogNavbar/>
            <main className="flex-grow w-full bg-background">
                <Suspense fallback={<ArticleSkeleton/>}>
                    {isPending && (
                        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <Spinner size="lg" color="primary"/>
                                <span className="text-foreground/80">加载中...</span>
                            </div>
                        </div>
                    )}
                    <Outlet/>
                </Suspense>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout