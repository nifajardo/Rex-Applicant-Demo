import { useEffect, useState } from "react";
import { fetchPostComments, createPostComment, incrementPostCommentsCount  } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const CommentSection = ({ postId, currentUser, onCommentAdded  }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true); // loading state

  const loadComments = async () => {
    if (!postId) return;
    setLoading(true);
    const { data, error } = await fetchPostComments(postId);
    if (!error) setComments(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  useEffect(() => {
    if (typeof onCommentAdded === "function") {
        onCommentAdded(comments.length); // send initial count
    }
}, [comments]);

//   const handleSubmit = async () => {
//     if (!newComment.trim()) return;

//     const { error } = await createPostComment({
//       post_id: postId,
//       user_id: currentUser.id,
//       user_name: currentUser.name,
//       content: newComment,
//     });

//     if (!error) {
//       setNewComment("");
//       loadComments();
//     }
//   };

    const handleSubmit = async () => {
        if (!newComment.trim()) return;

        const { data, error } = await createPostComment({
            post_id: postId,
            user_id: currentUser.id,
            user_name: currentUser.name,
            content: newComment,
        });

        if (!error) {
            setNewComment('');
            setComments(prev => [...prev, data[0]]); // Add the new comment

            // Update the parent PostCard comments_count
            if (typeof onCommentAdded === 'function') {
                onCommentAdded(prev => prev + 1); // call parent callback
            }
        }

         // increment comments_count in DB
        const { data: updatedPost, error: postError } = await incrementPostCommentsCount(postId);
        if (postError) {
            console.error("Failed to increment comments_count:", postError);
        } else {
            //  console.log(updatedPost)
        }
       
    };

  return (
    <div className="mt-4 w-full space-y-4">
      {loading ? (
        <div className="flex justify-center py-4">
             <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mb-4"
                >
                   <Loader2 className="h-8 w-8 text-primary" />
                
            </motion.div>
         
        </div>
      ) : (
        comments.map((c, i) => (
          <div key={i} className="flex items-start gap-3 w-full">
            {/* Avatar */}
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                c.user_name || "User"
              )}&background=random`}
              alt={c.user_name}
              className="h-8 w-8 rounded-full flex-shrink-0"
            />

            {/* Comment bubble */}
            <div className="bg-slate-100 rounded-2xl px-4 py-2 max-w-[80%] inline-block">
                <p className="text-sm font-semibold text-slate-800 leading-tight">
                    {c.user_name}
                </p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                    {c.content}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                    {new Date(c.created_at).toLocaleString()}
                </p>
            </div>

          </div>
        ))
      )}

      {/* Comment input */}
      <div className="flex items-start gap-3 pt-2 border-t border-slate-200 w-full">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            currentUser.name || "You"
          )}&background=random`}
          alt="You"
          className="h-8 w-8 rounded-full flex-shrink-0"
        />

        <div className="flex-1 flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="rounded-full bg-slate-100 border-none focus-visible:ring-1 focus-visible:ring-primary w-full"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="rounded-full"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
