import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import { Send, Bell, PlusCircle } from 'lucide-react-native';
import PostCard from '../components/PostCard';
import { initDB, getPosts, addPost, likePost } from '../database/sqlite';
import { theme } from '../Theme';

export default function FeedScreen({ route, navigation }) {
  const user = route.params?.user || 'Guest';
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setRefreshing(true);
    setPosts(await getPosts());
    setRefreshing(false);
  };

  useEffect(() => { initDB().then(load); }, []);

  const submit = async () => {
    if(!text.trim()) return;
    await addPost(user, text);
    setText('');
    Keyboard.dismiss();
    load();
  };

  const Header = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.welcome}>SOCIALOOP</Text>
        <Text style={styles.subtitle}>Welcome back, {user}</Text>
      </View>
      <TouchableOpacity 
        style={styles.bellBtn} 
        onPress={() => navigation.navigate('Notifications')}
      >
        <Bell color={theme.colors.text} size={22} />
        <View style={styles.badge} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item)=>String(item.id)}
        ListHeaderComponent={<Header />}
        contentContainerStyle={styles.listContent}
        onRefresh={load}
        refreshing={refreshing}
        renderItem={({item}) => (
          <PostCard 
            post={item} 
            onLike={async()=>{await likePost(item.id); load();}} 
          />
        )}
      />
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.input} 
            placeholder="Share something with the world..." 
            placeholderTextColor={theme.colors.textSecondary}
            value={text} 
            onChangeText={setText}
            multiline
          />
          <TouchableOpacity 
            style={[styles.postBtn, !text.trim() && { opacity: 0.5 }]} 
            onPress={submit}
            disabled={!text.trim()}
          >
            <Send color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
    paddingBottom: 100, // Space for input
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.md,
  },
  welcome: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.error,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
    maxHeight: 100,
    paddingTop: 10,
    paddingBottom: 10,
  },
  postBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  }
});
