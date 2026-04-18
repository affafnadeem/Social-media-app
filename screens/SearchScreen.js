import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { theme } from '../Theme';
import { Search, TrendingUp, Users, Clock } from 'lucide-react-native';

const TRENDING = [
  { id: '1', tag: '#Reactnative', posts: '1.2k' },
  { id: '2', tag: '#ExpoSDK51', posts: '850' },
  { id: '3', tag: '#WebDevelopment', posts: '2.4k' },
  { id: '4', tag: '#UIUXDesign', posts: '500' },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Search color={theme.colors.textSecondary} size={20} />
          <TextInput
            style={styles.input}
            placeholder="Search communities, posts..."
            placeholderTextColor={theme.colors.textSecondary}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <TrendingUp color={theme.colors.primary} size={20} />
          <Text style={styles.sectionTitle}>Trending Topics</Text>
        </View>
        <FlatList
          data={TRENDING}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.trendingItem}>
              <View>
                <Text style={styles.trendingTag}>{item.tag}</Text>
                <Text style={styles.trendingCount}>{item.posts} posts</Text>
              </View>
              <Clock color={theme.colors.textSecondary} size={16} />
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Users color={theme.colors.accent} size={20} />
          <Text style={styles.sectionTitle}>Popular Creators</Text>
        </View>
        <Text style={styles.placeholderText}>Search to find your friends and favorite creators!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    height: 44,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: 16,
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  trendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  trendingTag: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  trendingCount: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  placeholderText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  }
});
