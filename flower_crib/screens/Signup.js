import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { addDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

// import { AddUser } from '../Firebase/Users';
//icoons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
  Innercontainer,
  LeftIcon,
  PageLogo,
  PageTitle,
  StyledContainer,
  StyledFormArea,
  SubTitle,
  Colors,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from './../components/styles';
import { View, TouchableOpacity, ScrollView } from 'react-native';
//colors
const { brand, darkLight, primary } = Colors;
//datetime picker
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuthState } from 'react-firebase-hooks/auth';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);

  const navigation = useNavigation();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('CustomerCommon');
      }
    });

    return unsubscribe;
  }, []);

  //Actual date of birth to be sent
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: fullName });
        console.log('Registered with:', user.email);
        // var userUID = firebase.auth().currentUser.uid;
        // AddUser(fullName, email, date, userUID);
      })
      .catch((error) => alert(error.message));
  };
  const writeUsers = () => {
    const serviceRef = collection(db, 'UserLogin');
    addDoc(serviceRef, {
      fullname: fullName,
      address: address,
      phoneno: phoneno,
      date: date,
    })
      .then(() => {
        console.log('Document successfully written!');
        setFullName('');
        setAddress('');
        setPhoneno('');
        setDate('');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };
  function validateEmail(value) {
    let error;
    if (!value) {
      alert('Required');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }

  function validateUsername(value) {
    let error;
    if (!value) {
      alert('Required');
    }
    return error;
  }
  function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  }

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <Innercontainer>
        <PageTitle>GlamorZone Salon</PageTitle>
        <SubTitle>Account Signup</SubTitle>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <Formik
          initialValues={{ fullName: '', email: '', dateOfBirth: '', password: '', confirmPassword: '' }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Full Name"
                icon="person"
                placeholder="John Richard"
                placeholderTextColor={darkLight}
                value={fullName}
                onChangeText={(text) => setFullName(text)}
                validate={validateUsername}
              />
              <MyTextInput
                label="Phone No"
                icon="person"
                placeholder="07X XXX XXXX"
                placeholderTextColor={darkLight}
                value={phoneno}
                onChangeText={(text) => setPhoneno(text)}
              />

              <MyTextInput
                label="Address"
                icon="person"
                placeholder="Colombo"
                placeholderTextColor={darkLight}
                value={address}
                onChangeText={(text) => setAddress(text)}
              />

              <MyTextInput
                label="Email Address"
                icon="mail"
                placeholder="email@gmail.com"
                placeholderTextColor={darkLight}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                validate={validateEmail}
              />

              <MyTextInput
                label="Date of Birth"
                icon="calendar"
                placeholder="YYYY - MM - DD"
                placeholderTextColor={darkLight}
                value={dob ? dob.toDateString() : ''}
                onChangeText={(text) => setDate(text)}
                // value={date}
                // onChangeText={(text) => setDate(text)}
                isDate={true}
                editable={false}
                showDatePicker={showDatePicker}
              />

              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="* * * * * * * *"
                placeholderTextColor={darkLight}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
                validate={validatePassword}
              />

              {/* <MyTextInput
                label="Confirm Password"
                icon="lock"
                placeholder="* * * * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              /> */}

              <MsgBox>...</MsgBox>

              <StyledButton
                onPress={(e) => {
                  writeUsers();
                  handleSignUp();
                }}
              >
                <ButtonText>Create Account & Login</ButtonText>
              </StyledButton>
              <Line />

              <ExtraView>
                <ExtraText>Already have an account? </ExtraText>
                <TextLink onPress={() => navigation.replace('Login')}>
                  <TextLinkContent>Login</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </Innercontainer>
    </StyledContainer>
  );
};
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
