import {FC} from "react";
import {useParams} from "react-router";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getArticle} from "@/api/article";
import {Card, CardBody, CardHeader, Chip, Divider} from "@heroui/react";
import {formatDate} from "@/utils/date";
import {motion} from "framer-motion";
import ShadowBox from "@/components/ShadowBox.tsx";

const ArticleDetail: FC = () => {
    const {id} = useParams<{ id: string }>();

    const {data: article} = useSuspenseQuery({
        queryKey: ['article', id],
        queryFn: () => getArticle(Number(id)),
    });


    return (
        <div className=" mx-auto px-4 py-8 w-full">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <Card className="w-full">
                    <CardHeader className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-foreground">{article.title}</h1>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag: string) => (
                                <Chip
                                    key={tag}
                                    variant="flat"
                                    color="primary"
                                >
                                    {tag}
                                </Chip>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-default-500">
                            <span>{formatDate(article.created_at)}</span>
                        </div>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <div className="prose dark:prose-invert max-w-none ">
                            <ShadowBox htmlContent={article.content}/>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </div>
    );
};

export default ArticleDetail;