import {FC} from "react";
import {NavigatorProvider} from "@/components/NavigatorProvider.tsx";
import Layout from "@/layout/layout.tsx";

const NavigatorLayout: FC = () => {


    return (
        <NavigatorProvider>
            <Layout/>
        </NavigatorProvider>
    )
}

export default NavigatorLayout