import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Icon } from 'react-native-elements';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function AddReview() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setname] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [review, setreview] = useState('');
  const [ratting, setratting] = useState(3);
  const [hover, sethover] = useState('');
  // const [createdate, setcreatedate] = useState("");

  const handleSave = () => {
    if (!review || !ratting) {
      Alert.alert('Please Fill the Fields');
      return;
    }
    const reviewsRef = collection(db, 'Reviews');
    addDoc(reviewsRef, {
      review: review,
      ratting: ratting,
      user: user.displayName,
      createdate: Timestamp.now().toDate(),
    })
      .then(() => {
        Alert.alert('Successfully Added!');
        setreview('');
        setratting(3);
        // setcreatedate("");
      })
      .catch((error) => {
        console.error('Error Added!', error);
      });
  };
  return (
    <View>
      <View style={styles.addreview}>
        <Text style={styles.reviewtitle}>
          Social distancing is good for public health. Please highlight about our healthy business service operations{' '}
        </Text>
        <Text style={styles.addreviewtitle}>Write a Review</Text>
        {/* <TextInput
          style={styles.addname}
          placeholder={'Name'}
          value={name}
          onChangeText={(e) => {
            setname(e);
          }}
        /> */}
        <TextInput
          style={styles.typereview}
          placeholder={'Write your experience'}
          value={review}
          onChangeText={(e) => {
            setreview(e);
          }}
        />
        <Text style={styles.typeviewrating}>The Rating is {ratting}</Text>
        <View style={styles.addstar}>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <View>
                <TouchableOpacity name="rating" value={ratingValue} onPress={(e) => setratting(ratingValue, e)}>
                  <Icon
                    name="star"
                    type="ionicon"
                    size={23}
                    color={ratingValue <= (hover || ratting) ? '#ffc107' : '#e4e5e9'}
                    onPressIn={() => sethover(ratingValue)}
                    onPressOut={() => sethover(null)}
                    style={styles.star}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={styles.ReviewBtnContainer}>
          <Button color="#6d28d9" width="150" title="Add Review" onPress={handleSave} />
        </View>
        {/* <TouchableOpacity onPress={handleSave}>
          <View style={styles.BookNowBtnContainer}>
            <View style={styles.BookNowBtn}>
              <Text style={{ color: '#fff', fontSize: 18 }}> Add Review </Text>
            </View>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewWriteBtn: {
    marginTop: 10,
    marginLeft: 300,
    // backgroundColor: 'red'
  },
  addreview: {
    height: 'auto',
    width: 'auto',
    padding: 20,
    shadowColor: '#878383',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    borderRadius: 2,
    marginTop: -3,
  },
  reviewtitle: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#800000',
    fontStyle: 'italic',
    marginTop: -6,
  },
  addreviewtitle: {
    //   width: '70%',
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5185c2',
    paddingTop: 5,
  },

  addname: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    fontSize: 18,
    borderRadius: 6,
  },
  typereview: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    backgroundColor: '#CAE1F9',
  },
  typeviewrating: {
    marginTop: 10,
    paddingLeft: 5,
  },
  addstar: {
    flexDirection: 'row',
    paddingLeft: 5,
    marginTop: 8,
    marginBottom: 10,
  },
  BookNowBtn: {
    marginTop: -50,
    backgroundColor: '#6d28d9',
    height: 45,
    borderRadius: 5,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BookNowBtnContainer: {
    marginLeft: 170,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  ReviewBtnContainer: {
    marginTop: -50,
    marginLeft: 170,
  },
});
