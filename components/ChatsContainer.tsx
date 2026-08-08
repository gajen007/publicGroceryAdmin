import { Message } from '@/interfaces/Message';
import { socketService } from "@/services/socketService";
import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet
} from 'react-native';
import MessageBubble from "./MessageBubble";

interface Props {
  orderID: string;
  withWhomImChatting: string;
}

export default function ChatsContainer({ orderID,withWhomImChatting }: Props) {
  const [chats, setChats] = React.useState<Message[]>([]);

  // Set up the listener ONCE
useEffect(() => {
  const socket = socketService.socket;
  socket.on("chatsAboutOrder", (derivedChats: Message[]) => {
    setChats(derivedChats);
  });
  socket.on("newChatReceived", (newChat: Message) => {
    setChats((prev) => [...prev, newChat]);
  });
  return () => {
    socket.off("chatsAboutOrder");
    socket.off("newChatReceived");
  };
}, []); // empty deps = runs once

// Emit a request whenever orderID changes or a reload is triggered
useEffect(() => {
  if (!orderID) return;
  socketService.socket.emit("needChatsForThisOrder", {
    orderID,
    userType: "customer",
  });
}, [orderID]); // initial load

  return (
<FlatList
  style={styles.container}
  data={chats}
  keyExtractor={(item) => item.sent.toString()}
  renderItem={({ item }) => (
    <MessageBubble
      text={item.message}
      fromWhom={item.sentBy}
      toWhom={item.opponentType}
      withWhomImChatting={withWhomImChatting}
      isMine={item.sentBy === "merchant"}
      timestamp={item.sent.toString()}
    />
  )}
/>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
});
