import firebase from 'firebase';
import 'firebase/auth';

export const AddUser = async (fullName, email, date, uid) => {
  try {
    return await firebase
      .database()
      .ref('users/' + uid)
      .set({
        fullName: fullName,
        email: email,
        date: date,
      });
  } catch (error) {
    return error;
  }
};
