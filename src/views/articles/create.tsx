import {FC} from 'react';
import ArticleView from '@/components/ArticleView';
import {createArticle, CreateArticleRequest} from '@/api/article';
import {useNavigate} from 'react-router';
import {useMutation, useQueryClient} from "@tanstack/react-query";

const CreateArticle: FC = () => {
    const navigate = useNavigate();
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
            submitButtonText="创建文章"
        />
    );
};

export default CreateArticle;