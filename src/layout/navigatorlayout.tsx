import {FC} from "react";
import {NavigateProvider} from "@/components/NavigateProvider.tsx";
import Layout from "@/layout/layout.tsx";

const NavigatorLayout: FC = () => {


    return (
        <NavigateProvider>
            <Layout/>
        </NavigateProvider>
    )
}

export default NavigatorLayout