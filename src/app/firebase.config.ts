export const firebaseKeys = {
  apiKey: "AIzaSyBc7SDGSWhW7T4ldpMdo87qPUUb0v3IPdA",
  authDomain: "punchcard-264503.firebaseapp.com",
  databaseURL: "https://punchcard-264503.firebaseio.com",
  projectId: "punchcard-264503",
  storageBucket: "punchcard-264503.appspot.com",
  messagingSenderId: "290696883758",
  appId: "1:290696883758:web:1c21081acd6dda696cf9bf",
  measurementId: "G-VTXWK304VF"
};

export const firebaseConfig = {
  enableFirestoreSync: true, // enable/disable autosync users with firestore
  toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
  toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
  authGuardFallbackURL: '/loggedout', // url for unauthenticated users - to use in combination with canActivate feature on a route
  authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
  passwordMaxLength: 120, // `min/max` input parameters in components should be within this range.
  passwordMinLength: 2, // Password length min/max in forms independently of each componenet min/max.
  // Same as password but for the name
  nameMaxLength: 50,
  nameMinLength: 2,
  // If set, sign-in/up form is not available until email has been verified.
  // Plus protected routes are still protected even though user is connected.
  guardProtectedRoutesUntilEmailIsVerified: true,
  enableEmailVerification: true, // default: true
};
