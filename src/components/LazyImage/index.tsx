import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';

import { Small, Original } from './styles';

interface ILazyImage {
  smallSource: { uri: string };
  source: { uri: string };
  shouldLoad: boolean;
}

const AnimatedOriginal = Animated.createAnimatedComponent(Original);

const LazyImage: React.FC<ILazyImage> = ({
  smallSource,
  source,
  shouldLoad = false,
}) => {
  const opacity = new Animated.Value(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      setLoaded(true);
    }
  }, [shouldLoad]);

  function handleAnimate() {
    Animated.timing(opacity, {
      duration: 500,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Small source={smallSource} resizeMode="cover" blurRadius={3}>
      {loaded && (
        <AnimatedOriginal
          style={{ opacity }}
          onLoadEnd={handleAnimate}
          source={source}
          resizeMode="cover"
        />
      )}
    </Small>
  );
};

export default LazyImage;
