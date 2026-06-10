import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, FileText, ExternalLink } from "lucide-react";
import { fetchExternalAnnouncements } from "@/lib/externalSupabaseClient";

const AnnouncementsModal = ({ isOpen, onClose }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadAnnouncements();
    }
  }, [isOpen]);

  const loadAnnouncements = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await fetchExternalAnnouncements();
      if (error) throw error;

      // Filter to only show recent announcements (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentAnnouncements = (data || []).filter(ann =>
        new Date(ann.created_at) > thirtyDaysAgo
      );

      setAnnouncements(recentAnnouncements);
    } catch (error) {
      console.error("Error loading announcements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  // Function to convert URLs in text to clickable links
  const renderContentWithLinks = (content) => {
    if (!content) return null;

    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Split content by URLs and create elements
    const parts = content.split(urlRegex);
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const currentAnnouncement = announcements[currentIndex];
  const announcementImageUrl = currentAnnouncement ? (currentAnnouncement.imageurl || currentAnnouncement.image_url || currentAnnouncement.image || currentAnnouncement.url) : null;

  if (!isOpen || announcements.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" hideCloseButton>
        <DialogHeader className="relative">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-primary">
              📢 Official Announcement
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {announcements.length > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={announcements.length <= 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-slate-500">
                {currentIndex + 1} of {announcements.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={announcements.length <= 1}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-slate-500">Loading announcements...</p>
            </div>
          ) : currentAnnouncement ? (
            <>
              {currentAnnouncement.title && (
                <h3 className="text-lg font-semibold text-slate-900">
                  {currentAnnouncement.title}
                </h3>
              )}

              {announcementImageUrl && (
                <div className="rounded-lg overflow-hidden border border-slate-200">
                  <img
                    src={announcementImageUrl}
                    alt="Announcement"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {currentAnnouncement.videourl && (
                <div className="mt-4 aspect-video">
                  <iframe
                    src={currentAnnouncement.videourl.includes('youtube.com/embed') || currentAnnouncement.videourl.includes('vimeo.com/player')
                      ? currentAnnouncement.videourl
                      : currentAnnouncement.videourl.replace('watch?v=', 'embed/')}
                    className="w-full h-full rounded-md"
                    title={currentAnnouncement.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div className="text-slate-700 whitespace-pre-wrap">
                {renderContentWithLinks(currentAnnouncement.content)}
              </div>

              {/* Display attachments and external links */}
              <div className="flex flex-wrap gap-2 mt-4">
                {currentAnnouncement.attachmenturl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={currentAnnouncement.attachmenturl} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Attachment
                    </a>
                  </Button>
                )}

                {currentAnnouncement.externallink && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={currentAnnouncement.externallink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </div>

              {/* Display any additional links */}
              {(currentAnnouncement.link || currentAnnouncement.external_link || currentAnnouncement.website) && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-2">Related Links:</p>
                  <div className="space-y-1">
                    {currentAnnouncement.link && (
                      <a
                        href={currentAnnouncement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline text-sm block"
                      >
                        {currentAnnouncement.link}
                      </a>
                    )}
                    {currentAnnouncement.external_link && currentAnnouncement.external_link !== currentAnnouncement.link && (
                      <a
                        href={currentAnnouncement.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline text-sm block"
                      >
                        {currentAnnouncement.external_link}
                      </a>
                    )}
                    {currentAnnouncement.website && currentAnnouncement.website !== currentAnnouncement.link && currentAnnouncement.website !== currentAnnouncement.external_link && (
                      <a
                        href={currentAnnouncement.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline text-sm block"
                      >
                        {currentAnnouncement.website}
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="text-xs text-slate-500 border-t pt-2">
                Posted on {new Date(currentAnnouncement.created_at || currentAnnouncement.date).toLocaleDateString()}
                {currentAnnouncement.author && ` by ${currentAnnouncement.author}`}
                {currentAnnouncement.authorrole && ` (${currentAnnouncement.authorrole})`}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-500">No announcements available.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          {announcements.length > 1 && (
            <>
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
              <Button variant="outline" onClick={handleNext}>
                Next
              </Button>
            </>
          )}
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementsModal;