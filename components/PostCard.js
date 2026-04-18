import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Heart, MessageCircle, Share2, User } from 'lucide-react-native';
import { theme } from '../Theme';

export default function PostCard({ post, onLike }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <User color={theme.colors.textSecondary} size={20} />
        </View>
        <View>
          <Text style={styles.user}>{post.user}</Text>
          <Text style={styles.time}>{post.time || '2h ago'}</Text>
        </View>
      </View>
      
      <Text style={styles.content}>{post.content}</Text>
      
      {post.image && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: post.image }} 
            style={styles.postImage}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionBtn} onPress={onLike}>
          <Heart 
            fill={post.likes > 0 ? theme.colors.primary : 'transparent'} 
            color={post.likes > 0 ? theme.colors.primary : theme.colors.textSecondary} 
            size={20} 
          />
          <Text style={[styles.actionText, post.likes > 0 && {color: theme.colors.primary}]}>
            {post.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <MessageCircle color={theme.colors.textSecondary} size={20} />
          <Text style={styles.actionText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Share2 color={theme.colors.textSecondary} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  user: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
  time: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
  },
  content: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
    gap: theme.spacing.lg,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small.fontSize,
    fontWeight: '500',
  },
});
