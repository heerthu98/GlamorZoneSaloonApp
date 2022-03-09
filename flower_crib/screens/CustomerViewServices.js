import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  Pressable,
  Alert,
  Picker,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {
  Innercontainer,
  PageTitle,
  StyledFormArea,
  SubTitle,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  Avatar,
  WelcomeImage,
  StyledButtonSub,
} from '../components/styles';
import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { useAuthState } from 'react-firebase-hooks/auth';

// import { TextInput } from 'react-native-gesture-handler';

const timeSlotsH = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

export default function ViewService({ category, time, price, id }) {
  const navigation = useNavigation();

  const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    React.useEffect(() => {
      toggleModal();
    }, [visible]);

    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>{children}</View>
        </View>
      </Modal>
    );
  };

  const [visible, setVisible] = React.useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState('');

  const [availableSlots, setAvailableSlots] = useState(timeSlotsH);

  useEffect(() => {
    console.log(user);
    const bookingRef = collection(db, 'Booking');
    const q = query(bookingRef, where('date', '==', date));
    onSnapshot(q, (snapshot) => {
      const slots = timeSlotsH.filter((slot) => {
        return !snapshot.docs.map((doc) => doc.data().time).includes(slot);
      });
      setAvailableSlots(slots);
    });
  }, [date]);

  const onPressBook = () => {
    const bookingRef = collection(db, 'Booking');
    const booking = {
      date: date,
      time: selectedValue,
      category: category,
      price: price,
      email: user.email,
      user: user.displayName,
    };
    if (date == '') {
      alert('Please select the date');
    } else if (selectedValue == '') {
      alert('Please select the time');
    } else {
      addDoc(bookingRef, booking);
      setVisible(true);
      setDate(new Date());
      setSelectedValue('');
    }
  };

  return (
    <View style={styles.servicesSubContDrop}>
      <Icon name="md-arrow-forward" type="ionicon" color="#BB6286" size={25} />
      <Text style={styles.subTitle2}>{category}</Text>
      <Text style={styles.subTitle3}>Rs.{price}</Text>
      <Text style={styles.subTitle4}>{time}min</Text>
      <View style={styles.LeftIcon}>
        <Icon name="md-add-circle" type="ionicon" color="#6d28d9" size={20} onPress={() => setModalVisible(true)} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, marginTop: 235 }}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="md-close-circle" type="ionicon" color="#C11B17" size={27} />
              </Pressable>
            </View>
            <TextInput value={displayName} onChangeText={(e) => setDisplayName(e)}>
              {user?.displayName}
            </TextInput>
            <Text style={styles.modalText}>{category}</Text>
            <DatePicker
              style={styles.pickerDate}
              minDate={new Date()}
              mode="date"
              modal
              open={open}
              date={date}
              onDateChange={setDate}
              onConfirm={(date) => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <View>
              <Picker
                style={styles.pickerText}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label={'Select Time'} value={''} />
                {availableSlots.map((time, index) => {
                  return <Picker.Item label={time} value={time} key={index} />;
                })}
              </Picker>
            </View>

            <TouchableWithoutFeedback
              onPress={(e) => {
                onPressBook();
              }}
            >
              <View style={styles.BookNowBtnContainer}>
                <View style={styles.BookNowBtn}>
                  <Text style={{ color: '#fff', fontSize: 18 }}> Book Now </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ModalPoup visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.modalHeader1}>
              <TouchableOpacity style={styles.TextLink} onPress={() => setVisible(false)}>
                <Image source={require('../assets/img/x1.png')} style={{ height: 30, width: 30 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/img/success1.jpg')}
              style={{ height: 200, width: 200, marginVertical: 10 }}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#7195bf',
              textAlign: 'center',
            }}
          >
            Your appointment booking is Successful
          </Text>
          <WelcomeContainer>
            <StyledFormArea>
              <StyledButtonSub onPress={() => navigation.replace('CustomerAppointment')}>
                <ButtonText>View My Booking</ButtonText>
              </StyledButtonSub>
            </StyledFormArea>
          </WelcomeContainer>
        </ModalPoup>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  servicesSubCont: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 2,
    margin: 10,
    padding: 10,
    shadowColor: '#6e4c73',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  servicesSubContDrop: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 2,
    paddingLeft: 10,
    shadowColor: '#6e4c73',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2.5,
    flexDirection: 'row',
    height: 65,
    width: '90%',
    alignItems: 'center',
    marginLeft: 30,
  },
  subTitle2: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7195bf',
    padding: 3,
    paddingLeft: 6,
    marginLeft: 5,
    marginBottom: 5,
  },
  subTitle3: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E56717',
    padding: 3,
    left: 165,
    top: 37,
    position: 'absolute',
    zIndex: 1,
  },
  subTitle4: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#C11B17',
    padding: 3,
    left: 240,
    top: 37,
    position: 'absolute',
    zIndex: 1,
  },
  LeftIcon: {
    right: 10,
    top: 20,
    position: 'absolute',
    zIndex: 1,
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerText: {
    textAlign: 'center',
    width: 150,
    color: '#000000',
    padding: 10,
  },
  pickerDate: {
    width: 150,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    width: '100%',
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: -40,
    marginRight: -70,
  },
  modalHeader1: {
    width: '100%',
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  BookNowBtn: {
    margin: 3,
    backgroundColor: '#6d28d9',
    height: 45,
    borderRadius: 5,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BookNowBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});
