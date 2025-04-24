import {FC, useRef, useState, useEffect} from 'react';
import {Button, Input, Textarea} from '@heroui/react'
import {Editor} from '@tinymce/tinymce-react';
import type {Editor as TinyMCEEditor} from 'tinymce';
import {useQuery} from '@tanstack/react-query';
import {getTags, Tag} from '@/api/tag';

interface ArticleViewProps {
    initialTitle?: string;
    initialDescription?: string;
    initialContent?: string;
    initialTags?: string[];
    onSubmit: (data: {
        title: string;
        description: string;
        content: string;
        tags: string[];
    }) => void;
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
    const [tags, setTags] = useState<string[]>(initialTags);
    const [tagInput, setTagInput] = useState<string>("");
    const [isTagInputFocused, setIsTagInputFocused] = useState<boolean>(false);
    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        content?: string;
    }>({});

    const {data: tagList = []} = useQuery({
        queryKey: ['tags'],
        queryFn: () => getTags().then(res => res.data),
        enabled: isTagInputFocused
    });

    const availableTags = tagList
        .map(tag => tag.name)
        .filter(tagName => !tags.includes(tagName));

    const handleAddTag = (tagName: string) => {
        if (tagName.trim() && !tags.includes(tagName.trim())) {
            setTags([...tags, tagName.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tagInput.trim()) {
                handleAddTag(tagInput);
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
                                onFocus={() => setIsTagInputFocused(true)}
                                onBlur={() => setTimeout(() => setIsTagInputFocused(false), 200)}
                                placeholder="输入标签后按回车添加"
                                className="flex-1"
                            />
                            <Button
                                variant="bordered"
                                onClick={() => handleAddTag(tagInput)}
                            >
                                添加
                            </Button>
                        </div>
                        {isTagInputFocused && availableTags.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                                {availableTags.map((tag) => (
                                    <div
                                        key={tag}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleAddTag(tag)}
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                            <div
                                key={tag}
                                className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                            >
                                <span>{tag}</span>
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-gray-500 hover:text-gray-700"
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
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
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