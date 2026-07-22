// ============================================================
//  LOCAL JSON DATABASE  –  Drop-in Supabase replacement
//  All data is stored in localStorage under "rex_db"
// ============================================================

// ── helpers ──────────────────────────────────────────────────

const DB_KEY = 'rex_db';

function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return seed();
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// ── shared cache (bridges this app with the Admin demo) ───────
// A few tables (applicant records + feedback + chatbot inquiries)
// need to be visible to BOTH this app and the Admin app. Since the
// two apps run on different origins, plain localStorage can't cross
// between them — so for just these tables we read/write through a
// tiny local HTTP server instead. Everything else (profile, quiz,
// community posts, uploaded files, etc.) stays local-only, exactly
// as before.
const SHARED_CACHE_URL = import.meta.env.VITE_SHARED_CACHE_URL || 'http://localhost:4500';
const SHARED_TABLES = ['synced_profiles', 'feedback', 'chatbot_inquiries'];

async function refreshSharedTable(db, table) {
  if (!SHARED_TABLES.includes(table)) return db;
  try {
    const res = await fetch(`${SHARED_CACHE_URL}/table/${table}`);
    if (res.ok) db[table] = await res.json();
  } catch (_) {
    // Shared cache server not running — fall back to local copy silently.
  }
  return db;
}

async function persist(db, table) {
  saveDB(db);
  if (SHARED_TABLES.includes(table)) {
    try {
      await fetch(`${SHARED_CACHE_URL}/table/${table}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(db[table] || []),
      });
    } catch (_) {
      // Shared cache server not running — change stays local-only for now.
    }
  }
}

function seed() {
  const db = {
    users: [
      {
        id: 'demo-user-001',
        email: 'demo@rex.ph',
        password: 'Demo1234!',
        full_name: 'Demo Applicant',
        created_at: new Date().toISOString(),
      },
      {
        id: 'demo-user-002',
        email: 'alyssa@rex.ph',
        password: 'Demo1234!',
        full_name: 'Alyssa Ramirez',
        created_at: new Date().toISOString(),
      },
      {
        id: 'demo-user-003',
        email: 'miguel@rex.ph',
        password: 'Demo1234!',
        full_name: 'Miguel Torres',
        created_at: new Date().toISOString(),
      }
    ],
    profiles: [
      {
        id: 'demo-user-001',
        full_name: 'Demo Applicant',
        email: 'demo@rex.ph',
        phone: '09171234567',
        address: 'Brgy. Sample, Cabanatuan City',
        barangay: 'Brgy. Sample',
        birthdate: '2000-01-15',
        gender: 'Male',
        school: 'Nueva Ecija University of Science and Technology',
        program: 'BS Computer Science',
        academic_year: '2nd Year',
        gwa: 1.5,
        scholarship_type: 'ACADEMIC',
        application_type: 'New Application',
        father_is_deceased: false,
        mother_is_deceased: false,
        is_solo_parent: false,
        quiz_completed: true,
        privacy: false,
        updated_at: new Date().toISOString(),
      },
      {
        id: 'demo-user-002',
        full_name: 'Alyssa Ramirez',
        email: 'alyssa@rex.ph',
        phone: '09181234567',
        address: 'San Isidro, Batangas City',
        barangay: 'San Isidro',
        birthdate: '2001-04-22',
        gender: 'Female',
        school: 'Batangas State University',
        program: 'BS Accountancy',
        academic_year: '3rd Year',
        gwa: 1.65,
        scholarship_type: 'ACADEMIC',
        application_type: 'New Application',
        father_is_deceased: false,
        mother_is_deceased: false,
        is_solo_parent: false,
        quiz_completed: true,
        privacy: false,
        updated_at: new Date().toISOString(),
      },
      {
        id: 'demo-user-003',
        full_name: 'Miguel Torres',
        email: 'miguel@rex.ph',
        phone: '09191234567',
        address: 'Poblacion, Batangas City',
        barangay: 'Poblacion',
        birthdate: '2000-11-03',
        gender: 'Male',
        school: 'TESDA Regional Center',
        program: 'Welding NC II',
        academic_year: '1st Year',
        gwa: '',
        scholarship_type: 'TESDA',
        application_type: 'New Application',
        father_is_deceased: false,
        mother_is_deceased: false,
        is_solo_parent: false,
        quiz_completed: true,
        privacy: false,
        updated_at: new Date().toISOString(),
      }
    ],
    submitted_requirements: [],
    community_posts: [
      {
        id: 'post-001',
        user_id: 'demo-user-001',
        user_name: 'Demo Applicant',
        user_avatar_url: null,
        content: 'Welcome to the REX EDUCATION Applicant Portal! Feel free to share updates here.',
        image_url: null,
        likes_count: 3,
        comments_count: 1,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
      }
    ],
    post_comments: [
      {
        id: 'comment-001',
        post_id: 'post-001',
        user_id: 'demo-user-001',
        user_name: 'Demo Applicant',
        content: 'Good luck to everyone applying!',
        created_at: new Date(Date.now() - 3600000).toISOString(),
      }
    ],
    post_likes: [],
    feedback: [],
    chatbot_inquiries: [],
  };
  saveDB(db);
  return db;
}

function ok(data) { return { data, error: null }; }
function err(msg) { return { data: null, error: { message: msg, code: msg } }; }

// ── auth session (in-memory + localStorage) ──────────────────

const SESSION_KEY = 'rex_session';

function getStoredSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) { return null; }
}

function storeSession(session) {
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(SESSION_KEY);
}

// listeners registered by onAuthStateChange
const authListeners = [];

function notifyListeners(event, session) {
  authListeners.forEach(fn => {
    try { fn(event, session); } catch (_) {}
  });
}

// ── fake supabase client (only what the app uses) ─────────────

export const supabase = {
  auth: {
    getSession: async () => {
      const session = getStoredSession();
      return { data: { session } };
    },
    signInWithPassword: async ({ email, password }) => {
      const db = loadDB();
      const user = db.users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!user) return { data: null, error: { message: 'Invalid login credentials' } };
      const session = { user: { id: user.id, email: user.email, app_metadata: { provider: 'email' }, user_metadata: { full_name: user.full_name } } };
      storeSession(session);
      notifyListeners('SIGNED_IN', session);
      return { data: { session, user: session.user }, error: null };
    },
    signInWithOAuth: async () => {
      return { data: null, error: { message: 'Google sign-in is disabled in demo mode.' } };
    },
    signUp: async ({ email, password, options }) => {
      const db = loadDB();
      if (db.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { data: null, error: { message: 'User already registered' } };
      }
      const meta = options?.data || {};
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        password,
        full_name: meta.full_name || email.split('@')[0],
        created_at: new Date().toISOString(),
      };
      db.users.push(newUser);
      // create profile
      db.profiles.push({
        id: newUser.id,
        full_name: meta.full_name || '',
        email,
        phone: meta.phone || '',
        address: meta.address || '',
        barangay: '',
        birthdate: meta.birthdate || '',
        gender: meta.gender || '',
        school: meta.school || '',
        program: meta.program || '',
        academic_year: '',
        gwa: '',
        scholarship_type: 'ACADEMIC',
        application_type: 'New Application',
        father_is_deceased: false,
        mother_is_deceased: false,
        is_solo_parent: false,
        quiz_completed: false,
        privacy: false,
        updated_at: new Date().toISOString(),
      });
      saveDB(db);
      const session = { user: { id: newUser.id, email: newUser.email, app_metadata: { provider: 'email' }, user_metadata: { full_name: newUser.full_name } } };
      storeSession(session);
      notifyListeners('SIGNED_IN', session);
      return { data: { user: session.user, session }, error: null };
    },
    signOut: async () => {
      storeSession(null);
      notifyListeners('SIGNED_OUT', null);
      return { error: null };
    },
    onAuthStateChange: (callback) => {
      authListeners.push(callback);
      // immediately fire current session
      const session = getStoredSession();
      setTimeout(() => callback(session ? 'SIGNED_IN' : 'SIGNED_OUT', session), 0);
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              const idx = authListeners.indexOf(callback);
              if (idx !== -1) authListeners.splice(idx, 1);
            }
          }
        }
      };
    },
  },

  from: (table) => new QueryBuilder(table),

  storage: {
    from: (_bucket) => ({
      upload: async (path, file) => {
        // Store file as base64 in localStorage
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const key = `cgb_file_${path.replace(/\//g, '_')}`;
            localStorage.setItem(key, JSON.stringify({ base64: reader.result, name: file.name, path }));
            resolve({ data: { path }, error: null });
          };
          reader.onerror = () => resolve({ data: null, error: { message: 'File read failed' } });
          reader.readAsDataURL(file);
        });
      },
      getPublicUrl: (path) => {
        const key = `cgb_file_${path.replace(/\//g, '_')}`;
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            const { base64 } = JSON.parse(stored);
            return { data: { publicUrl: base64 } };
          }
        } catch (_) {}
        return { data: { publicUrl: '' } };
      },
      remove: async (paths) => {
        paths.forEach(p => {
          const key = `cgb_file_${p.replace(/\//g, '_')}`;
          localStorage.removeItem(key);
        });
        return { data: {}, error: null };
      },
    }),
  },

  functions: {
    invoke: async (fnName, _opts) => {
      console.info(`[Demo] Edge function "${fnName}" skipped in demo mode.`);
      return { data: null, error: null };
    },
  },
};

// ── QueryBuilder (fluent API matching Supabase client) ────────

class QueryBuilder {
  constructor(table) {
    this._table = table;
    this._filters = [];
    this._order = null;
    this._single = false;
    this._maybeSingle = false;
    this._selectFields = '*';
    this._operation = 'select';
    this._insertData = null;
    this._updateData = null;
    this._upsertData = null;
    this._deleteFlag = false;
    this._conflictKey = null;
    this._returning = false;
  }

  select(fields = '*') { this._selectFields = fields; this._operation = 'select'; return this; }
  insert(data) { this._operation = 'insert'; this._insertData = data; return this; }
  update(data) { this._operation = 'update'; this._updateData = data; return this; }
  upsert(data, opts) {
    this._operation = 'upsert';
    this._upsertData = Array.isArray(data) ? data : [data];
    this._conflictKey = opts?.onConflict || 'id';
    return this;
  }
  delete() { this._operation = 'delete'; return this; }
  eq(col, val) { this._filters.push({ type: 'eq', col, val }); return this; }
  order(col, opts) { this._order = { col, ascending: opts?.ascending !== false }; return this; }
  single() { this._single = true; return this; }
  maybeSingle() { this._maybeSingle = true; return this; }
  returning() { this._returning = true; return this; }

  // Allow .select() chained after insert/update/upsert to return data
  // The query executes on await (thenable)
  then(resolve, reject) {
    this._execute().then(resolve, reject);
  }

  async _execute() {
    const db = loadDB();
    if (!db[this._table]) db[this._table] = [];
    await refreshSharedTable(db, this._table);
    const table = db[this._table];

    if (!table) {
      if (this._operation === 'insert' || this._operation === 'upsert') {
        db[this._table] = [];
        saveDB(db);
        return this._execute();
      }
      return err(`Unknown table: ${this._table}`);
    }

    const matchRow = (row) =>
      this._filters.every(f => {
        if (f.type === 'eq') return String(row[f.col]) === String(f.val);
        return true;
      });

    if (this._operation === 'select') {
      let rows = table.filter(matchRow);
      if (this._order) {
        rows.sort((a, b) => {
          const av = a[this._order.col], bv = b[this._order.col];
          const cmp = av < bv ? -1 : av > bv ? 1 : 0;
          return this._order.ascending ? cmp : -cmp;
        });
      }
      if (this._single) {
        if (rows.length === 0) return err('PGRST116');
        return ok(rows[0]);
      }
      if (this._maybeSingle) return ok(rows[0] || null);
      return ok(rows);
    }

    if (this._operation === 'insert') {
      const rows = Array.isArray(this._insertData) ? this._insertData : [this._insertData];
      const inserted = rows.map(r => ({ ...r, id: r.id || `${this._table}-${Date.now()}-${Math.random().toString(36).slice(2)}`, created_at: r.created_at || new Date().toISOString() }));
      db[this._table].push(...inserted);
      await persist(db, this._table);
      if (this._single) return ok(inserted[0]);
      return ok(inserted);
    }

    if (this._operation === 'update') {
      let updated = null;
      db[this._table] = db[this._table].map(row => {
        if (!matchRow(row)) return row;
        const newRow = { ...row, ...this._updateData };
        updated = newRow;
        return newRow;
      });
      await persist(db, this._table);
      if (this._single) return ok(updated);
      return ok(updated ? [updated] : []);
    }

    if (this._operation === 'upsert') {
      const conflictKey = typeof this._conflictKey === 'string' ? [this._conflictKey] : this._conflictKey;
      const results = [];
      this._upsertData.forEach(newRow => {
        const idx = db[this._table].findIndex(r =>
          conflictKey.every(k => String(r[k]) === String(newRow[k]))
        );
        if (idx !== -1) {
          db[this._table][idx] = { ...db[this._table][idx], ...newRow, updated_at: new Date().toISOString() };
          results.push(db[this._table][idx]);
        } else {
          const toInsert = { ...newRow, id: newRow.id || `${this._table}-${Date.now()}`, created_at: newRow.created_at || new Date().toISOString() };
          db[this._table].push(toInsert);
          results.push(toInsert);
        }
      });
      await persist(db, this._table);
      return ok(results.length === 1 ? results[0] : results);
    }

    if (this._operation === 'delete') {
      db[this._table] = db[this._table].filter(r => !matchRow(r));
      await persist(db, this._table);
      return ok(null);
    }

    return err('Unknown operation');
  }

  // rpc passthrough
  rpc(_fn, _args) { return ok([]); }
}

// Add rpc to the main supabase object
supabase.rpc = async (_fn, _args) => ok([]);

// ── named exports matching original supabase.js ──────────────

export const signIn = async (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

export const signInWithGoogle = async () =>
  supabase.auth.signInWithOAuth({ provider: 'google' });

export const getSession = async () => supabase.auth.getSession();

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    try {
      if (event === 'SIGNED_IN' && session?.user) {
        const db = loadDB();
        const user = session.user;
        const exists = db.profiles.find(p => p.id === user.id);
        if (!exists) {
          db.profiles.push({
            id: user.id,
            full_name: user.user_metadata?.full_name || '',
            email: user.email,
            updated_at: new Date().toISOString(),
          });
          saveDB(db);
        }
      }
    } catch (_) {}
    callback(event, session);
  });
};

export const signUp = async (email, password, profileMetadata) => {
  const result = await supabase.auth.signUp({
    email,
    password,
    options: { data: profileMetadata }
  });
  return result;
};

export const signOut = async () => supabase.auth.signOut();

// Profile helpers
export const getProfile = async (userId) => {
  const db = loadDB();
  const profile = db.profiles.find(p => p.id === userId);
  if (!profile) return { data: null, error: { code: 'PGRST116', message: 'Not found' } };
  return ok(profile);
};

export const updateProfile = async (userId, updates) => {
  const db = loadDB();
  const idx = db.profiles.findIndex(p => p.id === userId);
  if (idx === -1) return err('Profile not found');
  db.profiles[idx] = { ...db.profiles[idx], ...updates, updated_at: new Date().toISOString() };
  saveDB(db);
  return ok([db.profiles[idx]]);
};

// Requirements helpers
export const getSubmittedRequirements = async (userId) => {
  const db = loadDB();
  const req = db.submitted_requirements.find(r => r.id === userId);
  if (!req) return { data: null, error: { code: 'PGRST116', message: 'Not found' } };
  return ok(req);
};

export const upsertSubmittedRequirements = async (userId, requirementsData) => {
  const db = loadDB();
  const idx = db.submitted_requirements.findIndex(r => r.id === userId);
  const newRow = { id: userId, ...requirementsData, updated_at: new Date().toISOString() };
  if (idx !== -1) db.submitted_requirements[idx] = newRow;
  else db.submitted_requirements.push(newRow);
  saveDB(db);
  return ok(newRow);
};

// File upload helpers
export const uploadFile = async (bucket, path, file) =>
  supabase.storage.from(bucket).upload(path, file);

export const getFileUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl || '';
};

// Community posts helpers
export const fetchCommunityPosts = async () => {
  const db = loadDB();
  const posts = [...db.community_posts].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return ok(posts);
};

export const toggleLikePost = async (postId, userId) => {
  const db = loadDB();
  const existing = db.post_likes.find(l => l.post_id === postId && l.user_id === userId);
  if (existing) {
    existing.is_active = !existing.is_active;
  } else {
    db.post_likes.push({ id: `like-${Date.now()}`, post_id: postId, user_id: userId, is_active: true });
  }
  // update count on post
  const post = db.community_posts.find(p => p.id === postId);
  if (post) post.likes_count = db.post_likes.filter(l => l.post_id === postId && l.is_active).length;
  saveDB(db);
  return ok({});
};

export const fetchPostsWithLikes = async (postIds, userId) => {
  const db = loadDB();
  const result = postIds.map(pid => {
    const likes = db.post_likes.filter(l => l.post_id === pid && l.is_active);
    const userLike = db.post_likes.find(l => l.post_id === pid && l.user_id === userId && l.is_active);
    return { post_id: pid, likes_count: likes.length, is_liked: !!userLike };
  });
  return ok(result);
};

export const createCommunityPost = async (postData) => {
  const db = loadDB();
  const post = { ...postData, id: `post-${Date.now()}`, likes_count: 0, comments_count: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  db.community_posts.push(post);
  saveDB(db);
  return ok(post);
};

export const uploadPostImage = async (userId, file) => {
  if (!file) return ok(null);
  const filePath = `${userId}/${Date.now()}_${file.name}`;
  const { data, error } = await uploadFile('post_images', filePath, file);
  if (error) return { data: null, error };
  const publicURL = getFileUrl('post_images', data.path);
  return ok({ ...data, publicURL });
};

export const deleteCommunityPost = async (postId) => {
  const db = loadDB();
  db.community_posts = db.community_posts.filter(p => p.id !== postId);
  db.post_likes = db.post_likes.filter(l => l.post_id !== postId);
  db.post_comments = db.post_comments.filter(c => c.post_id !== postId);
  saveDB(db);
  return ok(null);
};

export const updateCommunityPost = async (postId, updates) => {
  const db = loadDB();
  const idx = db.community_posts.findIndex(p => p.id === postId);
  if (idx === -1) return err('Post not found');
  db.community_posts[idx] = { ...db.community_posts[idx], ...updates, updated_at: new Date().toISOString() };
  saveDB(db);
  return ok(db.community_posts[idx]);
};

export const deletePostImage = async (_imagePath) => ok({});

export const fetchPostComments = (postId) => {
  const db = loadDB();
  const comments = db.post_comments
    .filter(c => c.post_id === postId)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  // Return a thenable
  return Promise.resolve(ok(comments));
};

export const createPostComment = async (comment) => {
  const db = loadDB();
  const newComment = { ...comment, id: `comment-${Date.now()}`, created_at: new Date().toISOString() };
  if (!Array.isArray(comment)) {
    db.post_comments.push(newComment);
  } else {
    comment.forEach(c => db.post_comments.push({ ...c, id: `comment-${Date.now()}`, created_at: new Date().toISOString() }));
  }
  saveDB(db);
  return ok([newComment]);
};

export const incrementPostCommentsCount = async (postId) => {
  const db = loadDB();
  const post = db.community_posts.find(p => p.id === postId);
  if (post) { post.comments_count = (post.comments_count || 0) + 1; saveDB(db); }
  return ok(post);
};

export const hasUserLikedPost = async (postId, userId) => {
  const db = loadDB();
  const like = db.post_likes.find(l => l.post_id === postId && l.user_id === userId && l.is_active);
  return { liked: !!like, error: null };
};

export const submitFeedback = async (feedbackData) => {
  const db = loadDB();
  if (!db.feedback) db.feedback = [];
  await refreshSharedTable(db, 'feedback');
  db.feedback.push({ ...feedbackData, id: `fb-${Date.now()}`, created_at: new Date().toISOString() });
  await persist(db, 'feedback');
  return ok({});
};

export const createChatbotInquiry = async (inquiryData) => {
  const db = loadDB();
  if (!db.chatbot_inquiries) db.chatbot_inquiries = [];
  await refreshSharedTable(db, 'chatbot_inquiries');
  db.chatbot_inquiries.push({ ...inquiryData, id: `ci-${Date.now()}`, created_at: new Date().toISOString() });
  await persist(db, 'chatbot_inquiries');
  return ok({});
};
