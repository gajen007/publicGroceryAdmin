import { Dimensions } from 'react-native';

export const ApiEndPoint = 'http://localhost:3000/groceryStore/';

export const ImageBaseURL = 'http://localhost:3000/';

export const convertPrice = (priceString:string) =>{
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ""))
};

export const srcLoader = ({ src }: { src: string }) => {
    return src;
  };

export interface CartItem {
  itemID: number;
  itemCount: number;
  itemName:string|undefined;
  itemValue:number;
  itemImage:string|undefined;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


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