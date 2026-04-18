import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, Modal, Dimensions } from 'react-native';
import { theme } from '../Theme';
import { User, Settings, Grid, Bookmark, MessageSquare, X, Heart } from 'lucide-react-native';

const PROFILE_POSTS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&w=800&q=80', caption: 'Deep learning in the neon city. The latent space is full of surprises. 🌃🤖', likes: 1250 },
  { id: 2, url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80', caption: 'Synthesizing new neural pathways. The future of cognition is hybrid. ⚛️🧠', likes: 840 },
  { id: 3, url: 'https://images.unsplash.com/photo-1678269142338-544338789365?auto=format&fit=crop&w=800&q=80', caption: 'Generative architecture with Stable Diffusion 3. Buildings that breathe. 🏗️✨', likes: 932 },
  { id: 4, url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80', caption: 'Exploring GPT-5 possibilities. The reasoning capabilities are off the charts. 🚀📈', likes: 1100 },
  { id: 5, url: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80', caption: 'Humanoid tactile sensors in 4K. Feeling the digital world. 🤖🤝', likes: 720 },
  { id: 6, url: 'https://images.unsplash.com/photo-1684129339770-bd594f70ff5d?auto=format&fit=crop&w=800&q=80', caption: 'Quantum supremacy and AI. Solving the unsolvable. 🔮⚛️', likes: 1450 },
];

export default function ProfileScreen({ route }) {
  const user = route.params?.user || 'Guest';
  const [selectedPost, setSelectedPost] = useState(null);

  const Stat = ({ label, value }) => (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsBtn}>
            <Settings color={theme.colors.text} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <User color={theme.colors.text} size={60} />
          </View>
          <Text style={styles.userName}>{user}</Text>
          <Text style={styles.bio}>AI Researcher & Prompt Architect. Building the future of Generative Intelligence. 🤖⚛️</Text>
          
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <Stat label="Posts" value="6" />
          <Stat label="Followers" value="1.2k" />
          <Stat label="Following" value="450" />
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Grid color={theme.colors.primary} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Bookmark color={theme.colors.textSecondary} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <MessageSquare color={theme.colors.textSecondary} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.postsGrid}>
          {PROFILE_POSTS.map((post) => (
            <TouchableOpacity 
              key={post.id} 
              style={styles.postPlaceholder}
              onPress={() => setSelectedPost(post)}
            >
              <Image source={{ uri: post.url }} style={styles.postImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Post Detail Modal */}
      <Modal
        visible={!!selectedPost}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedPost(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedPost(null)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <TouchableOpacity 
              style={styles.closeBtn}
              onPress={() => setSelectedPost(null)}
            >
              <X color="#fff" size={24} />
            </TouchableOpacity>
            
            {selectedPost && (
              <>
                <Image source={{ uri: selectedPost.url }} style={styles.modalImage} />
                <View style={styles.modalDetails}>
                  <View style={styles.modalHeader}>
                    <View style={styles.smallAvatar}>
                      <User color={theme.colors.textSecondary} size={16} />
                    </View>
                    <Text style={styles.modalUser}>{user}</Text>
                  </View>
                  <Text style={styles.modalCaption}>{selectedPost.caption}</Text>
                  <View style={styles.modalFooter}>
                    <Heart color={theme.colors.primary} fill={theme.colors.primary} size={20} />
                    <Text style={styles.modalLikes}>{selectedPost.likes} likes</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: theme.spacing.md,
  },
  profileInfo: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  userName: {
    color: theme.colors.text,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    marginBottom: theme.spacing.xs,
  },
  bio: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  editBtn: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  editBtnText: {
    color: theme.colors.text,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
    paddingBottom: 20,
  },
  postPlaceholder: {
    width: '33.33%',
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  modalContent: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1,
  },
  modalDetails: {
    padding: theme.spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  smallAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  modalUser: {
    color: theme.colors.text,
    fontWeight: '700',
    fontSize: 14,
  },
  modalCaption: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalLikes: {
    color: theme.colors.text,
    fontWeight: '600',
    fontSize: 14,
  }
});
