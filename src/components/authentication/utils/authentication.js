// import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";


// const auth = getAuth();

// export const handleCheckEmailExists = async (email) => {
//     setIsLoading(true);
//     setIsError(false);

//     try {
//       const user = await getAuth().fetchSignInMethodsForEmail(email);

//       if (user.length === 0) {
//         setHasAccount(false);
//         setStep(2);
//       } else {
//         setHasAccount(true);
//         setStep(2);
//       }
//     } catch (error) {
//       console.error('Error checking email:', error);
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   export const handleLogin = async (form) => {
//     setIsLoading(true);
//     setIsError(false);

//     try {
//       const email = form.email;
//       const password = form.password;

//       await signInWithEmailAndPassword(auth, email, password);
//       // Login successful, handle redirection or state changes here
//       console.log('Login successful!');
//     } catch (error) {
//       console.error('Login error:', error);
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   export const handleGoogleOauthSignIn = () => {
//     // Implement Google OAuth sign-in using Firebase Authentication methods
//     console.log('Google OAuth sign-in not implemented yet');
//   };

//   export const handleFacebookOauthSignIn = () => {
//     // Implement Facebook OAuth sign-in using Firebase Authentication methods
//     console.log('Facebook OAuth sign-in not implemented yet');
//   };

//   export const handleSendPasswordResetEmail = async (email) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       console.log('Password reset email sent successfully!');
//     } catch (error) {
//       console.error('Error sending password reset email:', error.message);
//       throw error;
//     }
//   };