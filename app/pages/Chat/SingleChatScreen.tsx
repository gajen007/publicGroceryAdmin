import ChatsContainer from '@/components/ChatsContainer';
import SendChatForm from '@/components/SendChatForm';
import { useLocalSearchParams } from "expo-router";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SingleChatScreen() {
  const { opponentType } = useLocalSearchParams<{ opponentType: string }>();
  const { orderID } = useLocalSearchParams<{ orderID: string }>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat with { opponentType.charAt(0).toUpperCase() + opponentType.slice(1) }</Text>
      </View>
        {
          orderID ? <View style={styles.chatArea}>
            <ChatsContainer 
              orderID={orderID}
              withWhomImChatting={opponentType}
            />
            <SendChatForm 
              orderID={orderID} 
              opponentType={opponentType}
          /></View>: null
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginTop:70,
  },
  header: {
    marginTop:20,
    marginLeft:10,
    paddingVertical: 2,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { color: '#000000', fontSize: 18, fontWeight: '700' },
  chatArea: { flex: 1 },
});