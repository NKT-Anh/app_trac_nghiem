import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth'; 
import { auth, db } from './firebaseconfig'; // Adjust the import path as necessary

// Authentication APIs
export const authAPI = {
  // Đăng ký tài khoản mới
  register: async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user document in Firestore
      await addDoc(collection(db, 'users'), {
        user_id: user.uid,
        name: name,
        email: email,
        avatar_url: null,
        level: 1,
        created_at: serverTimestamp(),
        role: 'user'
      });

      await updateProfile(user, { displayName: name });
      await sendEmailVerification(user);
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Đăng nhập
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Đăng xuất
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  },

  // Gửi email reset password
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  }
};

// User Profile APIs
export const userAPI = {
  // Lấy thông tin user
  getUserProfile: async (userId) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('user_id', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs[0]?.data() || null;
  },

  // Cập nhật thông tin user
  updateUserProfile: async (userId, userData) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('user_id', '==', userId));
    const snapshot = await getDocs(q);
    const userDoc = snapshot.docs[0];
    if (userDoc) {
      return await updateDoc(doc(db, 'users', userDoc.id), userData);
    }
    throw new Error('User not found');
  },

  // Lấy danh sách user (cho admin)
  getAllUsers: async () => {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

// // Quiz APIs
// export const quizAPI = {
//   // Lấy danh sách quiz của một lesson
//   getQuizzesByLesson: async (lessonId) => {
//     const quizzesRef = collection(db, 'Quizzes');
//     const q = query(quizzesRef, where('id_lessons', '==', lessonId));
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   },

//   // Lấy chi tiết một quiz
//   getQuizById: async (quizId) => {
//     const quizzesRef = collection(db, 'Quizzes');
//     const q = query(quizzesRef, where('id', '==', quizId));
//     const snapshot = await getDocs(q);
//     return snapshot.docs[0]?.data() || null;
//   },

//   // Lưu kết quả quiz
//   saveQuizResult: async (resultData) => {
//     const resultsRef = collection(db, 'quizResults');
//     return await addDoc(resultsRef, resultData);
//   },

//   // Lấy lịch sử làm quiz của user
//   getUserQuizHistory: async (userId) => {
//     const resultsRef = collection(db, 'quizResults');
//     const q = query(resultsRef, where('userId', '==', userId), orderBy('completedAt', 'desc'));
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   },

//   addQuiz: async (quizData) => {
//     const quizzesRef = collection(db, 'Quizzes');
//     return await addDoc(quizzesRef, {
//       ...quizData,
//       ngay_tao: serverTimestamp()
//     });
//   },

//   updateQuiz: async (quizId, quizData) => {
//     const quizzesRef = collection(db, 'Quizzes');
//     const q = query(quizzesRef, where('id', '==', quizId));
//     const snapshot = await getDocs(q);
//     const quizDoc = snapshot.docs[0];
//     if (quizDoc) {
//       return await updateDoc(doc(db, 'Quizzes', quizDoc.id), quizData);
//     }
//     throw new Error('Quiz not found');
//   }
// };

// // Topic APIs
// export const topicAPI = {
//   // Lấy danh sách topics
//   getTopics: async () => {
//     const topicsRef = collection(db, 'Topics');
//     const snapshot = await getDocs(topicsRef);
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   },

//   // Lấy chi tiết một topic
//   getTopicById: async (topicId) => {
//     const topicsRef = collection(db, 'Topics');
//     const q = query(topicsRef, where('topic_id', '==', topicId));
//     const snapshot = await getDocs(q);
//     return snapshot.docs[0]?.data() || null;
//   },

//   // Thêm topic mới
//   addTopic: async (topicData) => {
//     const topicsRef = collection(db, 'Topics');
//     return await addDoc(topicsRef, {
//       ...topicData,
//       created_at: serverTimestamp()
//     });
//   },

//   // Cập nhật topic
//   updateTopic: async (topicId, topicData) => {
//     const topicsRef = collection(db, 'Topics');
//     const q = query(topicsRef, where('topic_id', '==', topicId));
//     const snapshot = await getDocs(q);
//     const topicDoc = snapshot.docs[0];
//     if (topicDoc) {
//       return await updateDoc(doc(db, 'Topics', topicDoc.id), topicData);
//     }
//     throw new Error('Topic not found');
//   },

//   // Xóa topic
//   deleteTopic: async (topicId) => {
//     const topicRef = doc(db, 'topics', topicId);
//     return await deleteDoc(topicRef);
//   }
// };

// // Lesson APIs
// export const lessonAPI = {
//   // Lấy danh sách lessons của một topic
//   getLessonsByTopic: async (topicId) => {
//     const lessonsRef = collection(db, 'Lessons');
//     const q = query(lessonsRef, where('id_topic', '==', topicId));
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   },

//   getLessonById: async (lessonId) => {
//     const lessonsRef = collection(db, 'Lessons');
//     const q = query(lessonsRef, where('lessons_id', '==', lessonId));
//     const snapshot = await getDocs(q);
//     return snapshot.docs[0]?.data() || null;
//   },

//   // Thêm lesson mới
//   addLesson: async (lessonData) => {
//     const lessonsRef = collection(db, 'Lessons');
//     return await addDoc(lessonsRef, {
//       ...lessonData,
//       created_at: serverTimestamp()
//     });
//   },

//   updateLesson: async (lessonId, lessonData) => {
//     const lessonsRef = collection(db, 'Lessons');
//     const q = query(lessonsRef, where('lessons_id', '==', lessonId));
//     const snapshot = await getDocs(q);
//     const lessonDoc = snapshot.docs[0];
//     if (lessonDoc) {
//       return await updateDoc(doc(db, 'Lessons', lessonDoc.id), lessonData);
//     }
//     throw new Error('Lesson not found');
//   }
// };

// // User Progress APIs
// export const progressAPI = {
//   // Lấy tiến độ học của user
//   getUserProgress: async (userId) => {
//     const userRef = doc(db, 'users', userId);
//     const snapshot = await getDoc(userRef);
//     return snapshot.exists() ? snapshot.data().progress : null;
//   },

//   // Cập nhật tiến độ học
//   updateProgress: async (userId, progressData) => {
//     const userRef = doc(db, 'users', userId);
//     return await updateDoc(userRef, { progress: progressData });
//   }
// };

// // Study Log APIs
// export const studyLogAPI = {
//   // Thêm log học tập mới
//   addStudyLog: async (logData) => {
//     const logsRef = collection(db, 'studyLogs');
//     return await addDoc(logsRef, logData);
//   },

//   // Lấy logs của user
//   getUserLogs: async (userId) => {
//     const logsRef = collection(db, 'studyLogs');
//     const q = query(logsRef, where('userId', '==', userId), orderBy('startTime', 'desc'));
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   }
// };

