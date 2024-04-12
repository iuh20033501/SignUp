import React from 'react';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity,Alert } from 'react-native';
import ArrowIcon from '../assets/icon/ArrowIcon';
import { Avatar } from 'react-native-elements';
import { RadioButton } from "react-native-paper";
import axios from 'axios';
import DateTimePicker from "@react-native-community/datetimepicker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailProfile = ({ navigation, route }) => {
  const [coverPhoto, setCoverPhoto] = useState(require("../assets/profileTest/wall3.jpg"));
  const defaultAvatar = require('../assets/profileTest/defaultAVT.jpg');
  const { data } = route.params;
  const [newFirstName, setNewFirstName] = useState(data.firstName);
  const [newLastName, setNewLastName] = useState(data.lastName);
  const [newBirthday, setNewBirthday] = useState(new Date(data.birthday));
  const [newGender, setNewGender] = useState(data.gender);
  const [thumbnailAvatar, setThumbnailAvatar] = useState('');
  const [birthday, setBirthday] = useState(data.birthday);
  const { updateProfileData } = route.params;
  const [showDatePicker, setShowDatePicker] = useState(false);
console.log(newBirthday)
 const formattedDate = `${newBirthday.getDate().toString().padStart(2, '0')}-${(newBirthday.getMonth() + 1).toString().padStart(2, '0')}-${newBirthday.getFullYear()}`;

  const submitEdit = async () => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTI4NjE4ODcsInN1YiI6IjA5Mjk2MzU1NzIiLCJpYXQiOjE3MTI4NjAwODcsInR5cGUiOiJBQ0NFU1NfVE9LRU4ifQ.v9R_XaOGjroQnCaouWm2DeycKXg9mM-_HV2w6a4H2WM";
    const requestBody = {
      firstName: newFirstName,
      lastName: newLastName,
      gender: newGender,
      birthday: formattedDate,
    };

    if (!newFirstName.trim()) {
      Alert.alert(
        "Lỗi",
        "Họ không được để trống",
        [{ text: "OK" }]
      );
      return;
    }
    if (!newLastName.trim()) {
      Alert.alert(
        "Lỗi",
        "Tên không được để trống",
        [{ text: "OK" }]
      );
      return;
    }
    if (newBirthday.getUTCFullYear() > new Date().getUTCFullYear() - 18) {
      Alert.alert(
        "Lỗi",
        "Bạn chưa đủ 18 tuổi",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "default",
          },
        ],
        { cancelable: false }
      );
      return;
    }

    await axios.put('http://192.168.1.9:8080/api/v1/users/profile', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

    })
      .then(response => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Cập nhật không thành công không thành công. Mã lỗi: ', response.error);
        }
      })
      .then(data => {
        console.log('Cập nhật thành công thành công:', data);
        navigation.navigate('ProfileScreen', { updatedData: data });
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  const handleToggleDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setNewBirthday(date);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      {showDatePicker && (
        <DateTimePicker
          value={newBirthday}
          mode="date"
          format="dd-MM-yyyy"
          display="spinner"
          onChange={handleDateChange}
        /> 
      )}
      <View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('ProfileScreen')}>
            <ArrowIcon width={30} height={30} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginTop: 13, left: 30 }}>Chỉnh sửa thông tin</Text>
        </View>
        <View style={{ marginTop: 40, flexDirection: 'row' }}>
          <Avatar
            size={100}
            rounded={true}
            source={thumbnailAvatar ? { uri: thumbnailAvatar } : defaultAvatar}
          />
          <View style={styles.profileContainer}>
            <View style={styles.inputContainer}>
              <Text style={{fontSize:20,alignSelf:'center'}}>Họ:</Text>
              <TextInput
                style={styles.input}
                placeholder={"Nhập họ mới"}
                onChangeText={(text) => setNewFirstName(text)}
                value={newFirstName}
              />
            </View>
            <View style={styles.inputContainer}>
            <Text style={{fontSize:20,alignSelf:'center'}}>Tên:</Text>
              <TextInput
                style={styles.input}
                placeholder={"Nhập tên mới"}
                onChangeText={(text) => setNewLastName(text)}
                value={newLastName}
              />
            </View>
            <View style={styles.inputContainer}>
            <Text style={{fontSize:18}}>{newBirthday.toLocaleDateString()}</Text>
           
              <TouchableOpacity style={{marginLeft:70}} onPress={handleToggleDatePicker}>
              <Icon name="calendar" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <RadioButton.Group
            onValueChange={(newValue) => {
              if (typeof newValue !== 'undefined') {
                setNewGender(newValue === "true" ? true : false);
              }
            }}
            value={newGender ? "true" : "false"}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 10,
                  margin: 10,
                  left:120
                }}
              >
                <RadioButton value="true" />
              </View>
              <Text style={{left:130}}>Nam</Text>

              <View
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 10,
                  margin: 10,
                  left:150
                }}
              >
                <RadioButton value="false" />
              </View>
              <Text style={{left:160}}>Nữ</Text>
            </View>
            
          </RadioButton.Group>

        </View>
      </View>
      <TouchableOpacity style={{
        width: 300,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#009bf8',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: -15
      }}
        onPress={submitEdit}>
        <Text style={{ alignSelf: 'center', fontSize: 16 }} >Chỉnh sửa</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    marginLeft: 30
  },
  profileText: {
    fontSize: 15,
    paddingTop: 20,
    marginLeft: 10
  },
  inputContainer: {
    marginTop: -10,
    padding: 10,
    flexDirection:'row'
  },
  input: {
    height: 40,
    fontSize: 20,
    marginLeft:10
  },
  Button: {
    marginTop:10
  }
});

export default DetailProfile;
