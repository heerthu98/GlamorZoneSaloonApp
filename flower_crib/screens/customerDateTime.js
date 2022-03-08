import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
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
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextLink,
  TouchableOpacity,
  View,
  TextLinkContent,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { auth } from '../firebase';
import { Icon } from 'react-native-elements';

const SelectedDateTime = () => {
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

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.Innercontainer}>
        <Image style={styles.WelcomeImage} resizeMode="cover" source={require('./../assets/img/select1.jpg')} />
        <View style={styles.headercontainer}>
          <Text style={styles.PageTitle}>Pick Preferred Time</Text>
        </View>
        <View style={styles.selectContainer}>
          <Text style={styles.subTitle}>Select Date</Text>
          <View style={styles.selectSubCont}>
            <View style={styles.openingHours}>
              <Icon name="md-timer" type="ionicon" color="#cf18e8" size={20} paddingRight={5} />
              <View>
                <Text style={styles.weekdayOpen}>Monday - Friday</Text>
                <Text style={styles.hoursOpen}>8.30 AM - 6.00 PM</Text>
              </View>
            </View>
            <View style={styles.openingHours}>
              <Icon name="md-timer" type="ionicon" color="#cf18e8" size={20} paddingRight={5} />
              <View>
                <Text style={styles.weekdayOpen}>Saturday - Sunday</Text>
                <Text style={styles.hoursOpen}>9.00 AM - 8.00 PM</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.Line} />

        <View style={styles.timeContainer}>
          <Text style={styles.subTitle}>Available Time</Text>
          <View style={styles.availableTimeContainer}>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>9.00AM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>9.30AM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>10.00AM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>10.30AM</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.availableTimeContainer}>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>11.00AM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>11.30AM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>12.00PM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>12.30PM</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.availableTimeContainer}>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>1.00PM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>1.30PM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>2.00PM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>2.30PM</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.availableTimeContainer}>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>3.00PM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>3.30PM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>4.00PM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>4.30PM</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.availableTimeContainer}>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>5.00PM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>5.30PM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>6.00PM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.time}>
              <TouchableOpacity style={styles.TextLink} onPress={() => {}}>
                <Text style={styles.timeMin}>6.30PM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <WelcomeContainer>
          <StyledFormArea>
            <Line />
            <StyledButtonSub onPress={() => setVisible(true)}>
              <ButtonText>Book Now</ButtonText>
            </StyledButtonSub>
          </StyledFormArea>
        </WelcomeContainer>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ModalPoup visible={visible}>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.modalHeader}>
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
                <StyledButtonSub onPress={() => {}}>
                  <ButtonText>View My Booking</ButtonText>
                </StyledButtonSub>
              </StyledFormArea>
            </WelcomeContainer>
          </ModalPoup>
        </View>
      </View>
    </>
  );
};

export default SelectedDateTime;
const styles = StyleSheet.create({
  Innercontainer: {
    flex: 1,
    width: '100%',
  },

  WelcomeImage: {
    height: '40%',
    width: '100%',
  },
  headercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe2f2',
  },
  ExtraViewSelect: {
    borderRadius: 2,
    paddingLeft: 10,
    shadowColor: '#878383',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    height: '40%',
    width: '90%',
    marginLeft: 15,
    marginTop: 10,
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#7195bf',
    paddingLeft: 6,
    padding: 3,
  },
  PageTitle: {
    textAlign: 'left',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#6d28d9',
    padding: 10,
  },
  selectSubCont: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
  },
  openingHours: {
    paddingLeft: 20,
    flexDirection: 'row',
  },

  weekdayOpen: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8daacc',
  },

  hoursOpen: {
    fontSize: 15,
    color: '#7195bf',
  },

  Line: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 1,
    width: '90%',
    backgroundColor: '#9ca3af',
    marginVertical: 10,
    marginLeft: '5%',
  },
  addressStreet: {
    paddingLeft: 30,
    fontSize: 15,
    color: '#7195bf',
  },
  StyledButton: {
    padding: 10,
    backgroundColor: '#6d28d9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
  },
  timeContainer: {
    marginTop: -5,
    marginBottom: 20,
  },
  addressSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  Line: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 1,
    width: '90%',
    backgroundColor: '#9ca3af',
    marginVertical: 10,
    marginLeft: '5%',
  },
  availableTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    margin: 5,
    padding: 5,
    backgroundColor: '#CCE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    height: 30,
    width: 70,
  },
  timeMin: {},
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
  },
});
