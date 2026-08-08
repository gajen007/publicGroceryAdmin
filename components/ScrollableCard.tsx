import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface cardProps {
  cardTitle: string;
  themeColor: string;
  cardTitleColor: string;
  headerTextFontSize: number;
  marginTop: number;
  children: any;
  closeCard: () => void;
}

export default function ScrollableCard({
  children,
  cardTitle,
  themeColor,
  cardTitleColor,
  headerTextFontSize,
  marginTop,
  closeCard,
}: cardProps) {
  const styles = StyleSheet.create({
    cardStyle: {
      alignItems: "stretch",
      borderColor: themeColor,
      borderRadius: 5,
      borderWidth: 2,
      marginTop: marginTop,
      marginLeft: 5,
      marginRight: 5,
    },
    headerStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: headerTextFontSize * 1.5,
      backgroundColor: themeColor,
      padding: 2,
    },
    headerTextStyle: {
      fontSize: headerTextFontSize,
      color: cardTitleColor,
    },
    closeButtonStyle: {
      borderColor: "#F54927",
      backgroundColor: "#F54927",
      borderRadius: 15,
      paddingTop: 0,
      paddingBottom: 3,
      paddingLeft: 3,
      paddingRight: 3,
    },
    closeButtonTextStyle: {
      color: "#ffffff",
      fontSize: 18,
    },
    bodyStyle: {
      display: "flex",
      flexDirection: "column",
    },
  });

  const close = () => {
    closeCard();
  };

  return (
    <View style={styles.cardStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>{cardTitle}</Text>
        <Pressable onPress={() => close()} style={styles.closeButtonStyle}>
          <Text style={styles.closeButtonTextStyle}>X</Text>
        </Pressable>
      </View>
      <View style={{ height: 400 }}>
        <ScrollView style={styles.bodyStyle}>{children}</ScrollView>
      </View>
    </View>
  );
}
