import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { theme } from '../Theme';
import { Heart, UserPlus, AtSign, Bell } from 'lucide-react-native';
import { getNotifications } from '../database/notifications';

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

  const Icon = ({ type }) => {
    if (type === 'like') return <Heart color={theme.colors.error} size={20} fill={theme.colors.error} />;
    if (type === 'follow') return <UserPlus color={theme.colors.accent} size={20} />;
    if (type === 'mention') return <AtSign color={theme.colors.primary} size={20} />;
    return <Bell color={theme.colors.textSecondary} size={20} />;
  };

  const getMessage = (item) => {
    if (item.type === 'like') return `liked ${item.target}`;
    if (item.type === 'follow') return `started following you`;
    if (item.type === 'mention') return `mentioned you ${item.target}`;
    return 'sent you a notification';
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notificationItem}>
            <View style={styles.iconContainer}>
              <Icon type={item.type} />
            </View>
            <View style={styles.content}>
              <Text style={styles.message}>
                <Text style={styles.userName}>{item.user}</Text> {getMessage(item)}
              </Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notifications yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  message: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
  },
  userName: {
    fontWeight: '700',
  },
  time: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  empty: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 50,
  }
});
