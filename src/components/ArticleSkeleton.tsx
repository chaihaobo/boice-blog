import {FC} from "react";
import {Skeleton} from "@heroui/react";

const ArticleSkeleton: FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="space-y-8">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-content1 rounded-lg p-6">
                        <Skeleton className="h-8 w-3/4 mb-4"/>
                        <Skeleton className="h-4 w-1/2 mb-4"/>
                        <div className="flex gap-2 mb-4">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-6 w-16 rounded-full"/>
                            ))}
                        </div>
                        <Skeleton className="h-4 w-full mb-2"/>
                        <Skeleton className="h-4 w-5/6 mb-2"/>
                        <Skeleton className="h-4 w-4/6"/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleSkeleton; 