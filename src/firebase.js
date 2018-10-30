//    https://css-tricks.com/intro-firebase-react/    ///
  // Initialize Firebase
  import firebase from 'firebase'
  const config = {
    apiKey: "AIzaSyDZLoc63uu2UvJdy-R8qjx4-RlDbHmy0AU",
    authDomain: "infsys3816project-8503d.firebaseapp.com",
    databaseURL: "https://infsys3816project-8503d.firebaseio.com",
    projectId: "infsys3816project-8503d",
    storageBucket: "infsys3816project-8503d.appspot.com",
    messagingSenderId: "192625824557"
  };
  firebase.initializeApp(config);
  export default firebase;
