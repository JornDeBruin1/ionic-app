import * as firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from './environments/environment';

const initializeFirebase = async () => {
  try {
    // Initialize Firebase
    await firebase.initializeApp(environment.firebaseConfig);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase', error);
  }
};

// Export the function for Firebase initialization
export { initializeFirebase };