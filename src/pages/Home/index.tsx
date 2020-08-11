import React, { useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Shimmer from 'react-native-shimmer';

import api from '../../services/api';

import {
  Container,
  PostList,
  Post,
  PostImage,
  PostDescription,
  PostDescriptionText,
  PostDescriptionSeeMore,
  PostDescriptionSeeMoreText,
  PostUser,
  PostUserIcon,
  PostUserText,
  InterectionView,
  InterectionButton,
  InterectionText,
} from './styles';

export interface IPost {
  id: number;
  username: string;
  description: string;
  likes: number;
  comments: number;
  image: string;
  user_liked: boolean;
  loading: true;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  let postListRef = useRef<FlatList<IPost>>(null);
  useScrollToTop(postListRef);

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get('/posts');
      const responseWithLoading = response.data.map((post: IPost) => ({
        ...post,
        loading: true,
      }));
      setPosts(responseWithLoading);
    }
    loadPosts();
  }, []);

  async function handleLike(post_id: number, user_liked: boolean) {
    setPosts((state) =>
      state.map((post) =>
        post.id === post_id ? { ...post, user_liked: !user_liked } : post
      )
    );
    await api.patch(`/posts/${post_id}`, { user_liked: !user_liked });
  }

  return (
    <Container>
      <PostList
        ref={postListRef}
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
              <PostDescriptionSeeMore>
                <PostDescriptionSeeMoreText>
                  Ver descrição completa
                </PostDescriptionSeeMoreText>
              </PostDescriptionSeeMore>
            </PostDescription>
            <InterectionView>
              <InterectionButton
                onPress={() => handleLike(post.id, post.user_liked)}
              >
                <MaterialCommunityIcons
                  name="heart"
                  size={30}
                  color={post.user_liked ? '#e84a4a' : '#fff'}
                />
                <InterectionText>1M</InterectionText>
              </InterectionButton>
              <InterectionButton>
                <MaterialCommunityIcons
                  name="comment-text-outline"
                  size={30}
                  color="#fff"
                />
                <InterectionText>1M</InterectionText>
              </InterectionButton>
              <InterectionButton>
                <MaterialCommunityIcons name="send" size={30} color="#fff" />
              </InterectionButton>
              <InterectionButton>
                <MaterialCommunityIcons
                  name="plus-circle"
                  size={30}
                  color="#fff"
                />
              </InterectionButton>
            </InterectionView>
          </Post>
        )}
      />
    </Container>
  );
};

export default Home;
