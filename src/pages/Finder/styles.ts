import styled from 'styled-components/native';
import colors from '../../styles/colors';
import { FlatList, Dimensions } from 'react-native';
import InputComp from '../../components/Input';
import { IPost } from './index';

const windowWidth = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.primary};
`;

export const Input = styled(InputComp)``;

export const PostList = styled(FlatList as new () => FlatList<IPost>)`
  height: 100%;
`;

export const Post = styled.View`
  width: ${windowWidth / 3}px;
  height: 150px;
  border: 1.5px solid ${colors.primary};
`;

export const PostImage = styled.Image`
  flex: 1;
`;
