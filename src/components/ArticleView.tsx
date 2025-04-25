import {FC, useRef, useState} from 'react';
import {Button, Input, Textarea} from '@heroui/react'
import {Editor} from '@tinymce/tinymce-react';
import type {Editor as TinyMCEEditor} from 'tinymce';
import {useQuery} from '@tanstack/react-query';
import {getTags, Tag} from '@/api/tag';
import {useMemo} from 'react';
import {CreateArticleRequest} from "@/api/article.ts";

export interface ArticleViewProps {
    initialTitle?: string;
    initialDescription?: string;
    initialContent?: string;
    initialTags?: Tag[];
    onSubmit: (data: CreateArticleRequest) => void;
    submitButtonText?: string;
}


const apiKey: string = import.meta.env.VITE_TINY_API_KEY as string;

const ArticleView: FC<ArticleViewProps> = ({
                                               initialTitle = "",
                                               initialDescription = "",
                                               initialContent = "",
                                               initialTags = [],
                                               onSubmit,
                                               submitButtonText = "保存文章"
                                           }) => {
    const editorRef = useRef<TinyMCEEditor>(null);
    const [title, setTitle] = useState<string>(initialTitle);
    const [description, setDescription] = useState<string>(initialDescription);
    const [tags, setTags] = useState<Tag[]>(initialTags || []);
    const [tagInput, setTagInput] = useState<string>("");
    const debouncedTagInput = useMemo(() => tagInput.trim(), [tagInput]);
    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        content?: string;
    }>({});

    const {data: tagList = []} = useQuery({
        queryKey: ['tags', debouncedTagInput],
        queryFn: () => getTags(tagInput),
        enabled: debouncedTagInput.length > 0
    });

    const availableTags = tagList
        .filter(tag => !tags.some(t => t.id === tag.id));

    const handleAddTag = (tag: Tag) => {
        if (!tags.some(t => t.name === tag.name)) {
            setTags([...tags, tag]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: Tag) => {
        setTags(tags.filter(tag => tag.id !== tagToRemove.id));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const matchingTag = tagList.find(tag => tag.name.toLowerCase() === tagInput.trim().toLowerCase());
            if (!matchingTag) {
                handleAddTag({name: tagInput, id: 0});
            }
        }
    };

    const validateForm = () => {
        const newErrors: typeof errors = {};
        let isValid = true;

        if (!title.trim()) {
            newErrors.title = "请输入文章标题";
            isValid = false;
        }

        if (!description.trim()) {
            newErrors.description = "请输入文章描述";
            isValid = false;
        }

        if (!editorRef.current?.getContent().trim()) {
            newErrors.content = "请输入文章内容";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        if (editorRef.current) {
            const content = editorRef.current.getContent();
            onSubmit({
                title,
                description,
                content,
                tags
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">文章编辑</h1>
                <Button
                    variant="solid"
                    color="primary"
                    onClick={handleSubmit}
                >
                    {submitButtonText}
                </Button>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">文章标题</label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="请输入文章标题"
                        className={`w-full ${errors.title ? 'border-red-500' : ''}`}
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">文章描述</label>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="请输入文章描述"
                        className={`w-full ${errors.description ? 'border-red-500' : ''}`}
                        rows={3}
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">文章标签</label>
                    <div className="relative">
                        <div className="flex gap-2">
                            <Input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="输入标签后按回车添加"
                                className="flex-1"
                            />
                            <Button
                                variant="bordered"
                                onClick={() => handleAddTag({id: 0, name: tagInput})}
                            >
                                添加
                            </Button>
                        </div>
                        {debouncedTagInput && availableTags.length > 0 && (
                            <div
                                className="absolute z-10 w-full mt-1 bg-background/80 dark:bg-background/90 backdrop-blur-sm border border-divider rounded-md shadow-lg transition-all duration-200 ease-in-out transform origin-top scale-y-100">
                                {availableTags.map((tag) => (
                                    <div
                                        key={tag.name}
                                        className="px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer transition-colors duration-150 ease-in-out"
                                        onClick={() => handleAddTag(tag)}
                                    >
                                        {tag.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                            <div
                                key={tag.id}
                                className="flex items-center gap-1 bg-default-100 dark:bg-default-200 px-2 py-1 rounded transition-colors duration-150 ease-in-out"
                            >
                                <span className="text-default-800 dark:text-default-200">{tag.name}</span>
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-default-500 hover:text-default-700 dark:text-default-400 dark:hover:text-default-200 transition-colors duration-150 ease-in-out"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">文章内容</label>
                    <div className={errors.content ? "border border-red-500 rounded" : ""}>
                        <Editor
                            apiKey={apiKey}
                            onInit={(_evt, editor) => editorRef.current = editor}
                            initialValue={initialContent}
                            init={{
                                menubar: false,
                                inline_boundaries: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                tableofcontents_depth: 3
                            }}
                        />
                    </div>
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-500">{errors.content}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleView;