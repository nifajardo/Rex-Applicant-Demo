import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, MoreHorizontal, Trash2, Edit3, Megaphone, FileText, ExternalLink } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import CommentSection from "@/components/CommentSection";
import { toggleLikePost } from "@/lib/supabase";

const PostCard = ({ post, currentUserId, onDeletePost, onEditPost }) => {
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments_count || 0);
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(post.liked_by_user);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [liking, setLiking] = useState(false);

  const userName = post.user_name || "User";

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(' ').filter(Boolean);
    if (names.length === 0) return "U";
    if (names.length === 1) return names[0][0].toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  };

  const timeSince = (date) => {
    if (!date) return "";
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s ago";
  };

  const isAnnouncement = post.is_announcement;
  const postImageUrl = post.image_url || post.image || post.imageUrl || post.url;

  const handleToggleLike = async () => {
    if (liking) return;
    setLiking(true);

    const previousLiked = likedByCurrentUser;
    
    setLikedByCurrentUser(!previousLiked);
    setLikesCount(prev => previousLiked ? prev - 1 : prev + 1);

    try {
      const { error } = await toggleLikePost(post.id, currentUserId);
      if (error) {
        // Rollback
        setLikedByCurrentUser(previousLiked);
        setLikesCount(prev => previousLiked ? prev + 1 : prev - 1);
        toast({
          title: "Error",
          description: "Could not update like. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      setLikedByCurrentUser(previousLiked);
      setLikesCount(prev => previousLiked ? prev + 1 : prev - 1);
      console.error(err);
    }

    setLiking(false);
  };

   const handleNotImplemented = (feature) => {
    toast({
      title: `🚧 ${feature} Not Implemented`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      variant: "default",
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-slate-200",
        isAnnouncement ? "bg-blue-50 border-blue-200" : "bg-white"
      )}>
        <CardHeader className="flex flex-row items-start justify-between p-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-primary">
              {isAnnouncement ? (
                <AvatarFallback className="bg-blue-500 text-white">
                  <Megaphone size={20} />
                </AvatarFallback>
              ) : (
                <>
                  <AvatarImage
                    src={post.user_avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`}
                    alt={userName}
                  />
                  <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                </>
              )}
            </Avatar>
            <div>
              <p className="font-semibold text-slate-800">
                {isAnnouncement ? (post.author || post.user_name || 'Official Announcement') : userName}
              </p>
              <p className="text-xs text-slate-500">
                {timeSince(post.created_at)}
                {isAnnouncement && post.authorrole && ` • ${post.authorrole}`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAnnouncement && <Badge variant="outline" className="border-blue-500 text-blue-500">Official</Badge>}
            {post.user_id === currentUserId && !isAnnouncement && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border-slate-200 text-slate-800">
                  <DropdownMenuItem onClick={() => onEditPost(post)} className="focus:bg-slate-100">
                    <Edit3 className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDeletePost(post.id)}
                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {post.title && <h3 className="text-xl font-bold text-slate-900">{post.title}</h3>}
          {post.content && <p className="text-slate-700 whitespace-pre-wrap">{post.content}</p>}

          {postImageUrl && (
            <div className="rounded-lg overflow-hidden border border-slate-200">
              <img src={postImageUrl} alt="Post image" className="w-full h-auto object-cover" />
            </div>
          )}

          {isAnnouncement && post.videourl && (
            <div className="mt-4 aspect-video">
              <iframe
                src={post.videourl.includes('youtube.com/embed') || post.videourl.includes('vimeo.com/player')
                  ? post.videourl
                  : post.videourl.replace('watch?v=', 'embed/')}
                className="w-full h-full rounded-md"
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {isAnnouncement && (post.attachmenturl || post.externallink) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.attachmenturl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={post.attachmenturl} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Attachment
                  </a>
                </Button>
              )}

              {post.externallink && (
                <Button variant="outline" size="sm" asChild>
                  <a href={post.externallink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>
          )}

          <div className="flex space-x-2">
            {!isAnnouncement && (
              <Button
                variant="ghost"
                size="sm"
                disabled={liking}
                onClick={handleToggleLike}
                className={cn("text-slate-500 hover:text-slate-900 hover:bg-slate-100", likedByCurrentUser && "text-red-500")}
              >
                <Heart className={cn("mr-2 h-4 w-4 transition-transform", likedByCurrentUser && "fill-red-500 scale-110")} />
                {likesCount} Likes
              </Button>
            )}

            {!isAnnouncement && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(prev => !prev)}
                className="text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {commentsCount} Comments
              </Button>
            )}
          </div>
        </CardContent>

        {!isAnnouncement && showComments && (
          <CardFooter className="p-4 border-t border-slate-200 flex flex-col gap-4">
            <CommentSection
              postId={post.id}
              currentUser={{ id: currentUserId, name: userName }}
              onCommentAdded={(count) => setCommentsCount(count)}
            />
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default PostCard;
