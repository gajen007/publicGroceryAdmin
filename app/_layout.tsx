import { Stack } from "expo-router";
import "react-native-reanimated";
import { Provider, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ResponsiveMenu from "@/components/ResponsiveMenu";
import { store } from "./redux/store";
import { selectLoginStatus } from "./redux/auth";
const persistor = persistStore(store);

function AppLayout() {
  const loginStatus = useSelector(selectLoginStatus);
  return (
    <>
      {loginStatus && <ResponsiveMenu />}
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
            name="/pages/ManageDrivers"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="/pages/ManageDrivers/SingleDriver"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="/pages/Login" options={{ headerShown: false }} />
          <Stack.Screen name="/pages/SignUp" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppLayout />
      </PersistGate>
    </Provider>
  );
}