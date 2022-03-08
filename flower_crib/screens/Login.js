import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { auth } from '../firebase';

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
} from './../components/styles';
import { View, BackHandle, Alert, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

//colors
const { brand, darkLight, primary } = Colors;

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('CustomerCommon');
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <Innercontainer>
        <GoBackLeftIcon>
          <Icon
            style={styles.gobackBtn}
            name="arrow-back-outline"
            type="ionicon"
            color="#808080"
            size={26}
            onPress={() => navigation.replace('Home')}
          />
        </GoBackLeftIcon>
        <PageLogo resizeMode="cover" source={require('./../assets/img/image.png')} />
        <PageTitle>GlamorZone Salon</PageTitle>
        <SubTitle>Account Login</SubTitle>

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
              <StyledButton onPress={handleLogin}>
                <ButtonText>Login</ButtonText>
              </StyledButton>
              <Line />
              <StyledButton google={true} onPress={handleSignUp}>
                <Fontisto name="google" color={primary} size={25} />
                <ButtonText google={true}>Sign in with Google</ButtonText>
              </StyledButton>

              <ExtraView>
                <ExtraText>Don't have an account already? </ExtraText>
                <TextLink onPress={() => navigation.replace('Signup')}>
                  <TextLinkContent>Signup</TextLinkContent>
                </TextLink>
              </ExtraView>
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

export default Login;

const styles = StyleSheet.create({
  gobackBtn: {
    paddingRight: 290,
  },
});
