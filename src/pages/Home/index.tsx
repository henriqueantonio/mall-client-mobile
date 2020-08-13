import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../../services/api';

import {
  Container,
  PostList,
  Post,
  PostDescription,
  PostDescriptionText,
  PostDescriptionSeeMore,
  LazyImage,
  PostDescriptionSeeMoreText,
  PostUser,
  PostUserIcon,
  PostUserText,
  InterectionView,
  InterectionButton,
  InterectionText,
  Loading,
} from './styles';

export interface IPost {
  id: number;
  image: string;
  small: string;
  aspectRatio: number;
  description: string;
  user_liked: boolean;
  likes: number;
  comments: number;
  username: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewable, setViewable] = useState<Number[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  let postListRef = useRef<FlatList<IPost>>(null);
  useScrollToTop(postListRef);

  const loadPage = useCallback(
    async (pageNumber = page, shouldRefresh = false) => {
      if (pageNumber === total) return;
      if (loading) return;

      setLoading(true);

      const response = await api.get(
        `http://localhost:3333/posts?_limit=4&_page=${pageNumber}`
      );

      const totalItems = response.headers['x-total-count'];
      const data = response.data;
      setLoading(false);
      setTotal(Math.ceil(totalItems / 4));
      setPage(pageNumber + 1);
      setPosts(shouldRefresh ? data : [...posts, ...data]);
    },
    []
  );

  const refreshList = useCallback(async () => {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadPage();
  }, []);

  const handleViewableChanged = useCallback(
    ({ changed }: { changed: ViewToken[] }) => {
      setViewable(changed.map(({ item }: { item: IPost }) => item.id));
    },
    []
  );

  async function handleLike(post_id: number, user_liked: boolean) {
    // setPosts((state) =>
    //   state.map((post) =>
    //     post.id === post_id ? { ...post, user_liked: !user_liked } : post
    //   )
    // );
    // await api.patch(`/posts/${post_id}`, { user_liked: !user_liked });
  }

  return (
    <Container>
      <PostList
        ref={postListRef}
        data={posts}
        keyExtractor={(item) => String(item.id)}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 10,
        }}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadPage()}
        ListFooterComponent={loading ? <Loading /> : null}
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
            <LazyImage
              shouldLoad={viewable.includes(post.id)}
              smallSource={{ uri: post.small }}
              source={{ uri: post.image }}
            />
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
