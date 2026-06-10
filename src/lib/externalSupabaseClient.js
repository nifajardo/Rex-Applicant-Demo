// Demo mode: return static mock announcements instead of hitting Supabase

export const fetchExternalAnnouncements = async () => {
  const mockAnnouncements = [
    {
      id: 'ann-1',
      title: 'Application Period Open',
      content: 'The CGB Scholarship application period is now open. Please complete your profile and submit all required documents before the deadline.',
      author: 'CGB Scholarship Office',
      authorrole: 'Official',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      imageurl: null,
      videourl: null,
      attachmenturl: null,
      externallink: null,
    },
    {
      id: 'ann-2',
      title: 'Important Reminder: Document Checklist',
      content: 'Please make sure all uploaded documents are clear and legible. Blurry or incomplete documents will cause delays in your application review.',
      author: 'CGB Scholarship Office',
      authorrole: 'Official',
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      imageurl: null,
      videourl: null,
      attachmenturl: null,
      externallink: null,
    },
    {
      id: 'ann-3',
      title: 'Online Orientation Schedule',
      content: 'An online orientation for new scholars will be held this coming Saturday, 9:00 AM via Zoom. Check your email for the meeting link.',
      author: 'CGB Scholarship Office',
      authorrole: 'Official',
      created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
      imageurl: null,
      videourl: null,
      attachmenturl: null,
      externallink: null,
    },
  ];
  return { data: mockAnnouncements, error: null };
};
