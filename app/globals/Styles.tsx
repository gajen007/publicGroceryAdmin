import { Dimensions } from 'react-native';

// Get initial width
const { width: initialWidth } = Dimensions.get('window');

export const rem = (value: number) => {
  // Fetching it inside the function makes it more resilient 
  // and handles orientation changes if they occur.
  const screenWidth = Dimensions.get('window').width || initialWidth;
  return (screenWidth / 375) * 16 * value;
};

/*
import { useWindowDimensions } from 'react-native';

const MyComponent = () => {
  const { width } = useWindowDimensions();
  const dynamicRem = (value) => (width / 375) * 16 * value;
  
  // ...
}
*/