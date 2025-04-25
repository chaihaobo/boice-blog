import {FC, Suspense} from "react";
import {Outlet} from "react-router";
import {addToast, Spinner} from "@heroui/react";
import BlogNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "../utils/toast"

const Layout: FC = () => {


    toast.set((props) => {
        addToast({
            ...props
        })
    })


    return (
        <div className="min-h-screen flex flex-col">
            <BlogNavbar/>
            <main className="flex-grow w-full bg-background">
                <Suspense fallback={<Spinner className="w-full h-20 justify-center" size="lg"/>}>
                    <Outlet/>
                </Suspense>
            </main>
            <Footer/>


        </div>
    )
}

export default Layout