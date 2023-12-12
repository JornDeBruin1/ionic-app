export type FirebaseError = {
  code: string;
  message: string;
  // Add other properties if needed
};

export type FirebaseErrorCodes =
  | 'auth/invalid-email'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/network-request-failed'
  // Add more error codes as needed;
  export const FirebaseErrorMessage: Record<FirebaseErrorCodes, string> = {
    'auth/invalid-email': 'Invalid email address',
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Incorrect password',
    'auth/email-already-in-use': 'Email is already in use',
    'auth/weak-password': 'Password is too weak',
    'auth/network-request-failed': 'Network request failed',
    // Add more error messages for each error code
  };