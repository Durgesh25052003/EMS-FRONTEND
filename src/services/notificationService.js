import { db } from '../firebase/config';
import { ref, push, set, query, orderByChild, limitToLast } from 'firebase/database';

export const notificationService = {
  // Send notification to specific employee
  sendNotification: async (employeeId, notification) => {
    const notificationRef = ref(db, `notifications/${employeeId}`);
    const newNotificationRef = push(notificationRef);
    
    await set(newNotificationRef, {
      ...notification,
      timestamp: Date.now(),
      isRead: false
    });
  },

  // Get employee's notifications
  getNotifications: (employeeId, limit = 10) => {
    const notificationsRef = ref(db, `notifications/${employeeId}`);
    return query(notificationsRef, orderByChild('timestamp'), limitToLast(limit));
  },

  // Mark notification as read
  markAsRead: async (employeeId, notificationId) => {
    const notificationRef = ref(db, `notifications/${employeeId}/${notificationId}`);
    await set(notificationRef, { isRead: true });
  }
};