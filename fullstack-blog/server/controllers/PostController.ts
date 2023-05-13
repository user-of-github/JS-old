import { Request, response, Response } from 'express';
import PostModel from '../models/Post';
import { Post, PostDocument, PostResponse, PostsResponse, TagsResponse } from '../types/Post';
import { validationResult } from 'express-validator';
import { User, UserDocument } from '../types/User';

export const createPost = async (request: Request<{}, {}, Post>, response: Response<PostResponse>) => {
    try {
        const doc = new PostModel({
            title: request.body.title,
            text: request.body.text,
            imageUrl: request.body.imageUrl,
            tags: request.body.tags,
            author: (request as Request & { userId: string }).userId
        });

        const createdPost: Post = await doc.save() as Post;

        response.json({
            success: true,
            post: createdPost
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            success: false,
            error: 'Unable to create post'
        });
    }
};


export const getAllPosts = async (request: Request, response: Response<PostsResponse>) => {
    // response.header('Access-Control-Allow-Origin', '*');
    try {
        const posts: Post[] = await PostModel.find().populate('author').exec();

        const data: Post[] = posts.map((post: Post): Post => {
            const {author, ...restPost} = (post as unknown as PostDocument)._doc;
            const {passwordHash, ...restAuthor} = (author as UserDocument)._doc as User;
            return {...restPost, author: restAuthor};
        });

        response.json({
            success: true,
            posts: data
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            success: false,
            error: 'Unable to get posts'
        });
    }
};


export const getPost = async (request: Request, response: Response<PostResponse>) => {
    try {
        const id: string = request.params.id;

        const doc = await PostModel.findOneAndUpdate({_id: id}, {$inc: {viewsCount: 1}}, {returnDocument: 'after'});

        if (!doc) {
            return response.status(404).json({
                success: false,
                error: 'Post does not exist'
            });
        }

        response.json({
            success: true,
            post: doc
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            success: false,
            error: 'Unable to get post'
        });
    }
};

export const removePost = async (request: Request, response: Response<PostResponse>) => {
    try {
        const id: string = request.params.id;

        const doc = await PostModel.findOneAndDelete({_id: id});

        if (!doc) {
            return response.status(404).json({
                success: false,
                error: 'Unable to remove non-existing post'
            });
        }

        response.json({success: true});
    } catch (error) {
        console.error(error);
        response.status(500).json({
            success: false,
            error: 'Unable to remove post'
        });
    }
};

export const updatePost = async (request: Request, response: Response<PostResponse>) => {
    try {
        const id: string = request.params.id;

        const originalPost = await PostModel.findById(id);

        const doc = await PostModel.updateOne({_id: id}, {
            title: request.body.title || originalPost?.title,
            text: request.body.text || originalPost?.text,
            imageUrl: request.body.imageUrl || originalPost?.imageUrl,
            tags: request.body.tags || originalPost?.tags,
            author: (request as Request & { userId: string }).userId || originalPost?.author
        });

        response.json({
            success: true
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            success: false,
            error: 'Unable to update post'
        });
    }
};

export const getLastTags = async (request: Request, response: Response<TagsResponse>) => {
    const tagsNumber = 4;

    try {
        const posts: Post[] = await PostModel.find().limit(tagsNumber * 10).exec();

        const allTags: string[] = posts.map((post: Post): string[] => post.tags).flat();
        const tags: string[] = [...new Set<string>(allTags)].slice(0, tagsNumber);

        response.json({
            success: true,
            tags: tags
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            success: false,
            error: 'Unable to get tags'
        });
    }
};
