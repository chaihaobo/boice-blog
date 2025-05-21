import {FC} from 'react';
import ArticleView from '@/components/ArticleView';
import {CreateArticleRequest, editArticle, EditArticleRequest, getArticle} from '@/api/article';
import {useParams} from 'react-router';
import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {useNavigator} from "@/components/NavigatorProvider.tsx";

const EditArticle: FC = () => {
    const {navigate} = useNavigator();
    const queryClient = useQueryClient();
    const {id} = useParams<{ id: string }>();
    const {data: article} = useSuspenseQuery({
        queryKey: ['article', id],
        queryFn: () => getArticle(Number(id)),
    });

    const editArticleMutation = useMutation({
        mutationFn: ({id, data}: { id: number, data: EditArticleRequest }) => editArticle(id, data),
    });

    const handleSubmit = async (editArticleRequest: CreateArticleRequest) => {
        try {
            await editArticleMutation.mutateAsync({
                id: Number(id),
                data: {
                    ...editArticleRequest
                }
            })
            await queryClient.invalidateQueries({queryKey: ['articles']})
            navigate('/');

        } catch (error) {
            console.error('修改文章失败:', error);
        }
    };

    return (
        <ArticleView
            initialTags={article.raw_tags}
            initialTitle={article.title}
            initialDescription={article.description}
            initialContent={article.content}
            onSubmit={handleSubmit}
            submitButtonText="保存"
        />
    );
};

export default EditArticle;