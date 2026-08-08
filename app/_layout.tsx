import { Stack } from "expo-router";
import "react-native-reanimated";
import { Provider, } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ResponsiveMenu from "./components/ResponsiveMenu";
import { store } from "./redux/store";

export default function RootLayout() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ResponsiveMenu/>        
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="/" options={{ headerShown: false }} />
          <Stack.Screen
            name="/pages/MerchantHome"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="/pages/MerchantHome/SingleOrder"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="/pages/ManageProducts"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="/pages/ManageProducts/SingleProduct"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="/pages/ManageProducts/AddNewProduct"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="/pages/ManageCategories"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="/pages/ManageCategories/SingleCategory"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="/pages/ManageCategories/AddNewCategory"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="/pages/DetailedCart"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="/pages/Login" options={{ headerShown: false }} />
          <Stack.Screen name="/pages/SignUp" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
