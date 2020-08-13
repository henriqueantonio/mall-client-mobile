import styled from 'styled-components/native';
import colors from '../../styles/colors';
import { FlatList, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { IPost } from './index';
import LazyImageComp from '../../components/LazyImage';

const windowHeight = Dimensions.get('window').height;

export const Container = styled.View`
  flex: 1;
  background: ${colors.primary};
`;

export const PostList = styled(FlatList as new () => FlatList<IPost>)``;

export const Post = styled.View`
  height: ${windowHeight}px;
`;

export const LazyImage = styled(LazyImageComp)``;

export const PostDescription = styled.View`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 8%;
  background: rgba(34, 34, 34, 0.8);
  padding: 10px;
`;

export const PostDescriptionText = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #ffff;
  font-family: 'Roboto-Medium';
`;

export const PostDescriptionSeeMore = styled.TouchableOpacity.attrs({
  hitSlop: { top: 10, left: 10, right: 10, bottom: 10 },
})``;

export const PostDescriptionSeeMoreText = styled.Text`
  color: #ffff;
  font-family: 'Roboto-Black';
  font-weight: bold;
`;

export const PostUser = styled.View`
  position: absolute;
  left: 25%;
  right: 25%;
  top: ${10 + getStatusBarHeight()}px;
  z-index: 1;
  background: ${colors.primary};
  padding: 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const PostUserIcon = styled.Image`
  height: 25px;
  width: 25px;
  margin-right: 10px;
  border-radius: 12.5px;
`;

export const PostUserText = styled.Text`
  color: #ffff;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  font-weight: 600;
`;

export const InterectionView = styled.View`
  position: absolute;
  top: 20%;
`;

export const InterectionButton = styled.TouchableOpacity`
  margin: 8px;
`;

export const InterectionText = styled.Text`
  color: #fff;
  font-weight: 500;
  margin: 2px 5px;
  font-family: 'Roboto-Regular';
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#ffff',
})`
  margin: 30px 0;
`;
