import {FC} from 'react';
import ArticleView from '@/components/ArticleView';
import {createArticle, CreateArticleRequest} from '@/api/article';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigator} from "@/components/NavigateProvider.tsx";

const CreateArticle: FC = () => {
    const {navigate} = useNavigator();
    const queryClient = useQueryClient();
    const createArticleMutation = useMutation({
        mutationFn: createArticle,
    })

    const handleSubmit = async (data: CreateArticleRequest) => {
        try {
            await createArticleMutation.mutateAsync(data)
            await queryClient.invalidateQueries({queryKey: ['articles']})
            navigate('/');
        } catch (error) {
            console.error('创建文章失败:', error);
        }
    };

    return (
        <ArticleView
            onSubmit={handleSubmit}
            submitButtonText="创建"
        />
    );
};

export default CreateArticle;