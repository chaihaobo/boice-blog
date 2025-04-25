import {FC, useEffect} from 'react';
import {Card, CardBody, CardFooter, Spinner} from "@heroui/react";
import {Link} from "react-router";
import {motion} from "framer-motion";
import {useSuspenseInfiniteQuery, useSuspenseQuery} from '@tanstack/react-query';
import {Article, ArticleListResponse, getArticles} from '../api/article';
import {useInView} from 'react-intersection-observer';
import {formatDate} from '../utils/date';
import PasswordModal from "@/components/PasswordModal.tsx";
import {verifyPermission} from "@/api/api.ts";
import {useNavigator} from "@/components/NavigateProvider.tsx";

const PAGE_SIZE = 10;

const Index: FC = () => {
    const {ref, inView} = useInView();
    const {navigate} = useNavigator();

    const {
        data,
        fetchNextPage,
        refetch,
        hasNextPage,
        isFetchingNextPage,
    } = useSuspenseInfiniteQuery({
        queryKey: ['articles'],
        queryFn: ({pageParam = 1}) => getArticles(pageParam as number, PAGE_SIZE),
        getNextPageParam: (lastPage: ArticleListResponse, allPages: ArticleListResponse[]) => {
            const totalPages = Math.ceil(lastPage.total / PAGE_SIZE);
            const page = allPages.length;
            return page < totalPages ? page + 1 : undefined;
        },
        initialPageParam: 1,
        refetchOnWindowFocus: true,

    });
    useEffect(() => {
        refetch()
    });

    const {
        data: hasPermission,
    } = useSuspenseQuery({
        queryKey: ["has_permission"],
        queryFn: verifyPermission
    });

    // 当最后一个元素进入视口时加载下一页
    if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
    }

    const articles = data?.pages.flatMap(page => page.data) ?? [];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <PasswordModal/>
            <div className="space-y-8">
                {articles.map((article: Article) => (
                    <motion.div
                        key={article.id}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0}}
                        whileHover={{
                            scale: 1.02,
                            transition: {duration: 0.2}
                        }}
                    >
                        <Card className="hover:shadow-md transition-shadow">
                            <CardBody className="p-6">
                                <div className="flex flex-col gap-4">
                                    <motion.div
                                        className="flex flex-col gap-2"
                                        whileHover={{x: 5}}
                                        transition={{type: "spring", stiffness: 300}}
                                    >
                                        <h2 className="text-2xl font-bold text-foreground hover:text-primary transition-colors tracking-tight">
                                            <Link to={`/article/${article.id}`}>
                                                {article.title}
                                            </Link>
                                        </h2>
                                        <motion.p
                                            className="text-default-500 text-base leading-relaxed tracking-wide"
                                            whileHover={{scale: 1.01}}
                                            transition={{duration: 0.2}}
                                        >
                                            {article.description}
                                        </motion.p>
                                    </motion.div>
                                    <motion.div
                                        className="flex flex-wrap gap-2"
                                        whileHover={{scale: 1.05}}
                                        transition={{duration: 0.2}}
                                    >
                                        {article.tags.map((tag: string) => (
                                            <motion.span
                                                key={tag}
                                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm tracking-wide"
                                                whileHover={{
                                                    scale: 1.1,
                                                    backgroundColor: "rgba(var(--primary), 0.2)"
                                                }}
                                                transition={{duration: 0.2}}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>
                            </CardBody>
                            <CardFooter className="px-6 py-4 border-t border-divider">
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-sm text-default-500 tracking-wide">
                                        {formatDate(article.created_at)}
                                    </span>
                                    <motion.div
                                        whileHover={{x: 5}}
                                        transition={{type: "spring", stiffness: 300}}
                                    >
                                        {hasPermission && <a
                                            onClick={() => navigate(`/article/${article.id}/edit`)}
                                            className="text-primary mr-5 hover:text-primary-600 transition-colors text-sm font-medium tracking-wide cursor-pointer"
                                        >
                                            编辑
                                        </a>}
                                        <a
                                            onClick={() => navigate(`/article/${article.id}`)}
                                            className="text-primary hover:text-primary-600 transition-colors text-sm font-medium tracking-wide cursor-pointer"
                                        >
                                            阅读更多 →
                                        </a>
                                    </motion.div>

                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
                <div ref={ref} className="h-4 flex justify-center items-center">
                    {isFetchingNextPage && (
                        <motion.div
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.8}}
                            transition={{duration: 0.2}}
                        >
                            <Spinner size="lg" color="primary"/>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;