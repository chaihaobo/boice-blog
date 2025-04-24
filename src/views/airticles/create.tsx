import {FC} from 'react';
import ArticleView from '@/components/ArticleView';

const CreateArticle: FC = () => {
    const handleSubmit = (data: {
        title: string;
        description: string;
        content: string;
        tags: string[];
    }) => {
        // TODO: Implement article creation logic
        console.log(data);
    };

    return (
        <ArticleView
            onSubmit={handleSubmit}
            submitButtonText="创建文章"
        />
    );
};

export default CreateArticle;