import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export const Small = styled.ImageBackground`
  height: ${windowHeight}px;
  width: 100%;
  background: #eee;
`;

export const Original = styled(FastImage)`
  height: ${windowHeight}px;
  width: 100%;
`;
