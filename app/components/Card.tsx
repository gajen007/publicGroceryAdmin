import { FlexStyle, Pressable, StyleSheet, Text, View } from "react-native";

interface cardProps {
  cardTitle: string;
  themeColor: string;
  cardTitleColor: string;
  headerTextFontSize: number;
  contentFlexStyle: FlexStyle["flexDirection"];
  children: any;
  closeCard: () => void;
}

export default function Card({
  children,
  cardTitle,
  themeColor,
  cardTitleColor,
  headerTextFontSize,
  contentFlexStyle,
  closeCard,
}: cardProps) {
  const styles = StyleSheet.create({
    cardStyle: {
      alignItems: "stretch",
      borderColor: themeColor,
      borderRadius: 5,
      borderWidth: 2,
      margin: 5,
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
      color: "#f3e308ff",
      fontSize: 18,
    },
    bodyStyle: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingRight: 5,
      display: "flex",
      flexDirection: contentFlexStyle,
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
      <View style={styles.bodyStyle}>
        {children}
        <Text />
      </View>
    </View>
  );
}
