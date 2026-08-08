import { logout } from "@/app/redux/auth";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faLock,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { RelativePathString, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

const styles = StyleSheet.create({
  hamburgerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  hamburger: {
    marginTop: 5,
    marginLeft: 5,
  },
  container: {
    position: "absolute",
    top: 35,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#000000",
    zIndex: 100,
  },
  bannerTextContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 80,
  },
  bannerTextStyle: {
    fontSize: 25,
    color: "#ffffff",
  },
  expandedMenuContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5,
    opacity: 1,
    zIndex: 99,
    backgroundColor: "#000000",
    width: 350,
  },
  adminMenuItemsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  menuItemStyle: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    borderColor: "#ffffff",
    borderWidth: 1,
    padding: 5,
  },
  menuTextStyle: {
    marginLeft: 5,
    color: "#ffffff",
    fontSize: 20,
  },
  pressedItemStyle: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    borderColor: "#ffffff",
    borderWidth: 1,
    padding: 5,
    backgroundColor: "#ffffff",
  },
  pressedItemTextStyle: {
    marginLeft: 5,
    color: "#000000",
    fontSize: 20,
  },
});

interface MenuItem {
  id: number;
  title: string;
  route: RelativePathString; // This tells TS this string is a valid route
  icon?: any;
}

export default function ResponsiveMenu() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutProcess = () => {
    dispatch(logout());
    router.push("/");
  };
  const adminOptions: MenuItem[] = [
    {
      id: 2,
      title: "Dashboard",
      route: "/pages/MerchantHome" as RelativePathString,
    },
    {
      id: 3,
      title: "Products",
      route: "/pages/ManageProducts" as RelativePathString,
    },
    {
      id: 4,
      title: "Categories",
      route: "/pages/ManageCategories" as RelativePathString,
    },
    {
      id: 5,
      title: "Drivers",
      route: "/pages/ManageDrivers" as RelativePathString,
    },
  ];
  const [pressedItemIndex, setPressedItemIndex] = React.useState<number>(0);
  const pressed = (index: number, userType: string) => {
    setPressedItemIndex(index);
      let filtered = adminOptions.filter((menuItem) => menuItem.id === index);
      setExpanded(false);
      if (filtered.length > 0) {
        router.push(filtered[0].route as any);
      }
  };

  return (
    <View style={styles.container}>
      {expanded ? (
        <View style={styles.expandedMenuContainer}>
          <View>
            <Pressable onPress={() => setExpanded(false)}>
              <FontAwesomeIcon
                icon={faTimes as IconProp}
                size={32}
                color="#ffffff"
              />
            </Pressable>
          </View>
            <View style={styles.adminMenuItemsContainer}>
              {Array.isArray(adminOptions) &&
                adminOptions.map((item) => {
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => pressed(item.id, "admin")}
                    >
                      <View
                        style={
                          item.id !== pressedItemIndex
                            ? styles.menuItemStyle
                            : styles.pressedItemStyle
                        }
                      >
                        <Text
                          style={
                            item.id !== pressedItemIndex
                              ? styles.menuTextStyle
                              : styles.pressedItemTextStyle
                          }
                        >
                          {item.title}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              <View style={styles.menuItemStyle}>
                <Pressable onPress={() => logoutProcess()}>
                  <Text
                    style={{
                      color: "#F54927",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faLock as IconProp}
                      size={16}
                      color="#F54927"
                    />{" "}
                    Logout
                  </Text>
                </Pressable>
              </View>
            </View>
        </View>
      ) : (
        <View style={styles.hamburgerContainer}>
          <Pressable style={styles.hamburger} onPress={() => setExpanded(true)}>
            <FontAwesomeIcon
              icon={faBars as IconProp}
              size={32}
              color="#ffffff"
            />
          </Pressable>
        </View>
      )}
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerTextStyle}>Grocery Store</Text>
      </View>
    </View>
  );
}
