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
  let postListRef = useRef<FlatList<IPost>>(null);
  useScrollToTop(postListRef);

  const [feed, setFeed] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<null | Number>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState<Number[]>([]);

  async function loadFeed(pageNumber = page, shouldRefresh = false) {
    if (loading) return;
    if (totalPages && page > totalPages) return;

    setLoading(true);
    const response = await api.get<IPost[]>(
      `/feed?_limit=4&_page=${pageNumber}`
    );
    const data = response.data;
    const totalPosts = response.headers['x-total-count'];

    setFeed((state) => (shouldRefresh ? data : [...state, ...data]));
    setPage(pageNumber + 1);
    setTotalPages(Math.ceil(totalPosts / 4));
    setLoading(false);
  }

  useEffect(() => {
    loadFeed();
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadFeed(1, true);
    setRefreshing(false);
  }, []);

  const handleViewableChanged = useCallback(
    ({ changed }: { changed: ViewToken[] }) => {
      setViewable(changed.map(({ item }: { item: IPost }) => item.id));
    },
    []
  );

  return (
    <Container>
      <PostList
        ref={postListRef}
        data={feed}
        keyExtractor={(item) => String(item.id)}
        ListFooterComponent={loading ? <Loading /> : undefined}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadFeed()}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 10,
        }}
        renderItem={({ item: post }) => (
          <Post>
            <PostUser>
              <PostUserIcon
                source={{
                  uri: `http://api.adorable.io/avatars/285/${post.username}@adorable.png`,
                }}
              />
              <PostUserText>
                @{post.username} - {post.id}
              </PostUserText>
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
              <InterectionButton onPress={() => {}}>
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
