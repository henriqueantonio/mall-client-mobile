import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import {
  Container,
  PostList,
  Post,
  PostImage,
  PostDescription,
  PostDescriptionText,
  PostUser,
  PostUserIcon,
  PostUserText,
} from './styles';

export interface IPost {
  id: number;
  username: string;
  description: string;
  likes: number;
  comments: number;
  image: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get('/posts');
      setPosts(response.data);
    }
    loadPosts();
  }, []);

  return (
    <Container>
      <PostList
        data={posts}
        keyExtractor={(post) => String(post.id)}
        renderItem={({ item: post }) => (
          <Post>
            <PostUser>
              <PostUserIcon
                source={{
                  uri: `http://api.adorable.io/avatars/285/${post.username}@adorable.png`,
                }}
              />
              <PostUserText>@{post.username}</PostUserText>
            </PostUser>
            <PostImage source={{ uri: post.image }} />
            <PostDescription>
              <PostDescriptionText>{post.description}</PostDescriptionText>
            </PostDescription>
          </Post>
        )}
      />
    </Container>
  );
};

export default Home;
