import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { db } from '../firebase';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
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
  GoBackLeftIcon,
} from '../components/styles';
import { View, BackHandle, Alert } from 'react-native';
import { addDoc, collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { Icon } from 'react-native-elements';

//colors
const { brand, darkLight, primary } = Colors;

const AdminLogin = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = () => {
    if (email == 'glamorzone@gmail.com' && password == 'Admin') {
      navigation.replace('AdminCommon');
    } else if (email == '' && password == '') {
      alert('Please enter username and password & Try again');
    } else if (password == '') {
      alert('Please enter password');
    } else if (email == '') {
      alert('Please enter username');
    } else {
      alert('Please enter correct username and password & Try again');
    }
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <Innercontainer>
        <GoBackLeftIcon>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            color="#808080"
            size={26}
            onPress={() => navigation.replace('Home')}
          />
        </GoBackLeftIcon>
        <PageLogo resizeMode="cover" source={require('./../assets/img/image.png')} />
        <PageTitle>GlamorZone Salon</PageTitle>
        <SubTitle>Admin Account Login</SubTitle>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email Address"
                icon="mail"
                placeholder="email@gmail.com"
                placeholderTextColor={darkLight}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
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
              />
              <MsgBox>...</MsgBox>
              <Line />
              <StyledButton onPress={handleLogin}>
                <ButtonText>Login</ButtonText>
              </StyledButton>

              {/* <StyledButton google={true} onPress={handleSignUp}> */}
              <Fontisto name="google" color={primary} size={25} />
              <ButtonText google={true}>Sign in with Google</ButtonText>
              {/* </StyledButton> */}
            </StyledFormArea>
          )}
        </Formik>
      </Innercontainer>
    </StyledContainer>
  );
};
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default AdminLogin;
