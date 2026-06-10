import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import PostCard from "./PostCard";

const CommunityFeed = ({ currentUserId, onDeletePost, onEditPost, onCreatePostClick, posts = [], isLoading = false }) => {
  return (
    <Card className="bg-white border-slate-200">
      <CardHeader className="flex flex-row justify-between items-center border-b border-slate-200 pb-4 px-6">
        <div>
          <CardTitle className="text-2xl font-semibold text-primary">Community Feed</CardTitle>
          <CardDescription className="text-slate-500">Latest updates from the community.</CardDescription>
        </div>
        <Button onClick={onCreatePostClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Create Post
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <LoadingSpinner message="Loading posts..." />
        ) : posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                currentUserId={currentUserId}
                onDeletePost={onDeletePost}
                onEditPost={onEditPost}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-12 text-slate-500">
            No posts yet. Be the first to share something!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityFeed;
