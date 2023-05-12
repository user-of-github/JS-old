import React from 'react';
import PostsStore from './PostsStore';


const PostsStoreContext = React.createContext<typeof PostsStore>(PostsStore);

export const usePostsStore = () => React.useContext(PostsStoreContext);
