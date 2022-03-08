import firebase from 'firebase';

export const AddService = async (serviceType, service, uid) => {
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
