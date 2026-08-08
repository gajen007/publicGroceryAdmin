import { socketService } from '@/services/socketService';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  orderID: string;
  opponentType: string;
}

export default function SendChatForm({ orderID, opponentType }: Props) {
  const [textInput, setTextInput] = useState('');
  const [senderType] = React.useState<string>("merchant"); //since this component is only used in the single-chat-screen that is rendered for the customer, we can hardcode the senderType as "customer" here
  const sendChat = () => {
    if (!textInput.trim()) return;
    socketService.socket.emit('postThisChat', {
      orderID,
      senderType,
      opponentType,
      chatMessage: textInput,
    });
    setTextInput('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={setTextInput}
        placeholder="Type a message..."
        multiline
      />
      <TouchableOpacity style={styles.sendBtn} onPress={sendChat}>
        <Text style={styles.sendIcon}>➤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 15,
    maxHeight: 100,
    backgroundColor: '#fafafa',
    marginRight: 8,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: { color: '#fff', fontSize: 18 },
});
