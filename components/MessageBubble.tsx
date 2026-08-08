// components/MessageBubble.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  text: string;
  fromWhom: string;
  toWhom: string;
  withWhomImChatting: string;
  isMine: boolean;
  timestamp: string;
}

export default function MessageBubble ({ text, fromWhom, toWhom, withWhomImChatting, isMine, timestamp }: Props){

  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    withWhomImChatting==="driver"&&((fromWhom==="driver"&&toWhom==="merchant")||(fromWhom==="merchant"&&toWhom==="driver"))&&
    <View style={[styles.wrapper, isMine ? styles.wrapperRight : styles.wrapperLeft]}>
      <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
        <Text style={[styles.text, isMine ? styles.textMine : styles.textTheirs]}>
          {text}
        </Text>
        <Text style={[styles.timestamp, isMine ? styles.timestampMine : styles.timestampTheirs]}>
          {formattedTime}
        </Text>
      </View>
    </View>||
      withWhomImChatting==="customer"&&((fromWhom==="customer"&&toWhom==="merchant")||(fromWhom==="merchant"&&toWhom==="customer"))&&
    <View style={[styles.wrapper, isMine ? styles.wrapperRight : styles.wrapperLeft]}>
      <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
        <Text style={[styles.text, isMine ? styles.textMine : styles.textTheirs]}>
          {text}
        </Text>
        <Text style={[styles.timestamp, isMine ? styles.timestampMine : styles.timestampTheirs]}>
          {formattedTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // --- Alignment ---
  wrapper: {
    marginVertical: 4,
    marginHorizontal: 12,
    flexDirection: 'row',
  },
  wrapperRight: {
    justifyContent: 'flex-end',
  },
  wrapperLeft: {
    justifyContent: 'flex-start',
  },

  // --- Bubble shape ---
  bubble: {
    maxWidth: '75%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  bubbleMine: {
    borderWidth: 2,
    borderColor: '#180bd1',
    borderBottomRightRadius: 4,  // ← "tail" effect
  },
  bubbleTheirs: {
    borderWidth: 2,
    borderColor: '#74046e',
    borderBottomLeftRadius: 4,   // ← "tail" effect
  },

  // --- Message text ---
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  textMine: {
    color: '#1A1A1A',
  },
  textTheirs: {
    color: '#1A1A1A',
  },

  // --- Timestamp ---
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  timestampMine: {
    color: 'rgba(99, 8, 8, 0.65)',
  },
  timestampTheirs: {
    color: 'rgba(99, 8, 8, 0.65)',
  },
});