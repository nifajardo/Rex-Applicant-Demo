
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  fetchCommunityPosts, 
  fetchPostsWithLikes,
  createCommunityPost, 
  uploadPostImage,
  deleteCommunityPost,
  updateCommunityPost,
  deletePostImage
} from "@/lib/supabase";
import { fetchExternalAnnouncements } from "@/lib/externalSupabaseClient";

export const useCommunityPosts = (userId, profileData, userName) => {
  const { toast } = useToast();
  
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const loadPosts = useCallback(async () => {
    setIsLoadingPosts(true);
    try {
      const [{ data: communityPosts, error: postsError }, { data: announcements, error: announcementsError }] = await Promise.all([
        fetchCommunityPosts(),
        fetchExternalAnnouncements()
      ]);

      if (postsError) throw postsError;
      if (announcementsError) throw announcementsError;
      console.log("Fetched announcements posts:", announcements);

      const formattedAnnouncements = (announcements || []).map(ann => ({
        ...ann,
        id: `ann-${ann.id}`,
        user_name: ann.author || ann.author_name || 'Official Announcement',
        user_avatar_url: null,
        content: ann.content,
        image_url: ann.imageurl || ann.image_url || ann.image || ann.url || null,
        videourl: ann.videourl,
        attachmenturl: ann.attachmenturl,
        externallink: ann.externallink,
        author: ann.author,
        authorrole: ann.authorrole,
        created_at: ann.created_at || ann.date,
        is_announcement: true,
        likes_count: 0,
        liked_by_user: false,
        comments_count: 0,
        title: ann.title,
      }));

      const communityPostsData = communityPosts || [];
      let enrichedCommunityPosts = communityPostsData.map(post => ({
        ...post,
        likes_count: 0,
        liked_by_user: false,
      }));

      if (userId && communityPostsData.length > 0) {
        const postIds = communityPostsData.map(post => post.id);
        const { data: likesData, error: likesError } = await fetchPostsWithLikes(postIds, userId);
        if (likesError) throw likesError;

        const likesMap = Object.fromEntries(
          (likesData || []).map(l => [
            l.post_id,
            { likesCount: l.likes_count, likedByUser: l.is_liked }
          ])
        );

        enrichedCommunityPosts = communityPostsData.map(post => ({
          ...post,
          likes_count: likesMap[post.id]?.likesCount ?? 0,
          liked_by_user: likesMap[post.id]?.likedByUser ?? false,
        }));
      }

      const combinedPosts = [...enrichedCommunityPosts, ...formattedAnnouncements];

      combinedPosts.sort((a, b) => {
        // First priority: announcements
        if (a.is_announcement && !b.is_announcement) return -1;
        if (!a.is_announcement && b.is_announcement) return 1;

        // Second priority: date (newest first)
        return new Date(b.created_at) - new Date(a.created_at);
      });
      
      setPosts(combinedPosts);
    } catch (error) {
      toast({ title: "Error", description: "Could not fetch posts. " + error.message, variant: "destructive" });
    } finally {
      setIsLoadingPosts(false);
    }
  }, [toast]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleCreatePost = async (postDetails) => {
    if (!userId || !profileData) {
      toast({ title: "Error", description: "User not identified.", variant: "destructive" });
      return;
    }
    let imageUrl = editingPost ? editingPost.image_url : null;

    if (postDetails.imageFile) {
      const { data: imageData, error: imageError } = await uploadPostImage(userId, postDetails.imageFile);
      if (imageError) {
        toast({ title: "Error", description: `Image upload failed: ${imageError.message}`, variant: "destructive" });
        return;
      }
      imageUrl = imageData.publicURL;
    }

    if (editingPost) { 
        const updates = {
            content: postDetails.content,
            image_url: imageUrl, 
            code_snippet: postDetails.codeSnippet,
            code_language: postDetails.codeLanguage,
        };
        const { data, error } = await updateCommunityPost(editingPost.id, updates);
        if (error) {
          toast({ title: "Error", description: `Failed to update post: ${error.message}`, variant: "destructive" });
          return;
        }
        await loadPosts();
        toast({ title: "Success", description: "Post updated!" });
    } else { 
        const postData = {
          user_id: userId,
          user_name: profileData.full_name || userName,
          user_avatar_url: profileData.avatar_url || null, 
          content: postDetails.content,
          image_url: imageUrl,
          code_snippet: postDetails.codeSnippet,
          code_language: postDetails.codeLanguage,
        };
        const { data, error } = await createCommunityPost(postData);
        if (error) {
          toast({ title: "Error", description: `Failed to create post: ${error.message}`, variant: "destructive" });
          return;
        }
        await loadPosts();
        toast({ title: "Success", description: "Post created!" });
    }
    setCreatePostOpen(false);
    setEditingPost(null);
  };

  const handleDeletePost = async (postId) => {
    if (String(postId).startsWith('ann-')) {
      toast({ title: "Info", description: "Announcements cannot be deleted from here." });
      return;
    }
    const postToDelete = posts.find(p => p.id === postId);
    if (!postToDelete) return;

    try {
      if (postToDelete.image_url) {
        await deletePostImage(postToDelete.image_url);
      }
      const { error } = await deleteCommunityPost(postId);
      if (error) throw error;
      setPosts(posts.filter(p => p.id !== postId));
      toast({ title: "Success", description: "Post deleted." });
    } catch (error) {
      toast({ title: "Error", description: "Could not delete post. " + error.message, variant: "destructive" });
    }
  };
  
  const handleEditPost = (post) => {
    if (post.is_announcement) {
      toast({ title: "Info", description: "Announcements cannot be edited from here." });
      return;
    }
    setEditingPost(post);
    setCreatePostOpen(true);
  };

  return {
    posts,
    isLoadingPosts,
    createPostOpen,
    setCreatePostOpen,
    editingPost,
    setEditingPost,
    handleCreatePost,
    handleDeletePost,
    handleEditPost,
  };
};
