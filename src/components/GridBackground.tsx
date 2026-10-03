import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Pattern, Rect, Stop } from 'react-native-svg';

export function GridBackground() {
  const [size, setSize] = useState({ width: 390, height: 844 });

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width && height && (width !== size.width || height !== size.height)) {
      setSize({ width, height });
    }
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" onLayout={onLayout}>
      <Svg width={size.width} height={size.height}>
        <Defs>
          <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#C9F2FC" />
            <Stop offset="0.45" stopColor="#A9E4F8" />
            <Stop offset="1" stopColor="#8EC8F4" />
          </LinearGradient>
          <Pattern id="paper" width="28" height="28" patternUnits="userSpaceOnUse">
            <Path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke="#E8FBFF"
              strokeWidth="1.6"
            />
          </Pattern>
        </Defs>
        <Rect x="0" y="0" width={size.width} height={size.height} fill="url(#sky)" />
        <Rect x="0" y="0" width={size.width} height={size.height} fill="url(#paper)" />
      </Svg>
    </View>
  );
}
