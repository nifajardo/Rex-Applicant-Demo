import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ImagePlus, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const CreatePostDialog = ({ open, onOpenChange, onCreatePost, editingPost }) => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [codeSnippet, setCodeSnippet] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    if (editingPost) {
      setContent(editingPost.content || '');
      setCodeSnippet(editingPost.code_snippet || '');
      setCodeLanguage(editingPost.code_language || 'javascript');
      // Note: Image editing is not handled here, user would need to re-upload.
      // For simplicity, we don't pre-fill the image.
      if (editingPost.code_snippet) {
        setShowCodeInput(true);
      }
    } else {
      // Reset form when creating a new post
      setContent('');
      setCodeSnippet('');
      setCodeLanguage('javascript');
      setShowCodeInput(false);
      removeImage();
    }
  }, [editingPost, open]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({ title: "Image too large", description: "Please select an image smaller than 2MB.", variant: "destructive" });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const resetForm = () => {
    setContent('');
    removeImage();
    setCodeSnippet('');
    setCodeLanguage('javascript');
    setShowCodeInput(false);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !imageFile && !codeSnippet.trim()) {
      toast({ title: "Empty Post", description: "Please write something, add an image, or a code snippet.", variant: "destructive" });
      return;
    }
    setIsPosting(true);
    try {
      await onCreatePost({ content, imageFile, codeSnippet, codeLanguage });
      resetForm();
      onOpenChange(false);
      toast({ title: editingPost ? "Post Updated!" : "Post Created!", description: "Your post is now live." });
    } catch (error) {
      toast({ title: "Error", description: error.message || "Could not save your post.", variant: "destructive" });
    } finally {
      setIsPosting(false);
    }
  };

  const handleCloseDialog = () => {
    if (isPosting) return;
    onOpenChange(false);
    // Resetting state is handled by useEffect on `open`
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[525px] bg-card/90 backdrop-blur-lg border-border shadow-2xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
          <DialogDescription>
            Share your thoughts, images, and code with the community.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] bg-background/70 border-input focus:border-primary transition-colors"
            maxLength={2000}
          />
          <AnimatePresence>
            {showCodeInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 overflow-hidden"
              >
                <div className="flex justify-between items-center">
                  <Label htmlFor="code-language" className="text-sm font-medium text-muted-foreground">Code Language</Label>
                  <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                      <SelectItem value="sql">SQL</SelectItem>
                      <SelectItem value="bash">Bash/Shell</SelectItem>
                      <SelectItem value="plaintext">Plain Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Paste your code here..."
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  className="min-h-[150px] bg-black/80 text-white font-mono text-sm border-input focus:border-primary transition-colors"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {imagePreview && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
              <img-replace src={imagePreview} alt="Selected preview" className="rounded-lg max-h-60 w-full object-contain border border-border" />
              <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity" onClick={removeImage}>
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 pt-2">
            <div className='flex items-center space-x-2'>
                <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                    <ImagePlus className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Input id="post-image" type="file" accept="image/png, image/jpeg, image/gif" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
                <Button variant="ghost" size="icon" onClick={() => setShowCodeInput(!showCodeInput)}>
                    <Code2 className={`h-5 w-5 transition-colors ${showCodeInput ? 'text-primary' : 'text-muted-foreground'}`} />
                </Button>
            </div>
            <div className='flex items-center space-x-2'>
                <Button variant="outline" onClick={handleCloseDialog} disabled={isPosting}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={isPosting || (!content.trim() && !imageFile && !codeSnippet.trim())}>
                    {isPosting ? "Posting..." : (editingPost ? "Save Changes" : "Post")}
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;