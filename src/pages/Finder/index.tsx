import React, { useState, useEffect } from 'react';
import { Form } from '@unform/mobile';

import api from '../../services/api';

import { Container, Input, PostList, Post, PostImage } from './styles';

export interface IPost {
  id: number;
  image: string;
}

const Finder: React.FC = () => {
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
      <Form onSubmit={() => {}}>
        <Input name="search" icon="search-web" placeholder="Pesquisar..." />
        <PostList
          data={posts}
          keyExtractor={(post) => String(post.id)}
          renderItem={({ item: post }) => (
            <Post>
              <PostImage source={{ uri: post.image }} />
            </Post>
          )}
          numColumns={3}
        />
      </Form>
    </Container>
  );
};

export default Finder;
