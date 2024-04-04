import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Picker } from 'react-native';
import ArrowIcon from '../assets/icon/ArrowIcon';
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
const Register = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState(true); 
  const [click, setClick] = useState(false)
 const { accessToken } = route.params;
  // const { accessToken } = useState('1234');
  const clickMouse = () => {
    if (click === false) setClick(true);
    else setClick(false)
  };
  
  const handleRegister = async () => {
    const formattedDate = `${birthday.getDate().toString().padStart(2, '0')}-${(birthday.getMonth() + 1).toString().padStart(2, '0')}-${birthday.getFullYear()}`;

    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      birthday: formattedDate,
      password: password
    };

    await fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Đăng ký không thành công. Mã lỗi: ' + response.status);
      }
    })
    .then(data => {
      // Xử lý dữ liệu trả về khi đăng ký thành công
      console.log('Đăng ký thành công:', data);
    })
    .catch(error => {
      console.error(error.message);
    });
  }

  return (
    <View style={styles.container}>
      <View>
        <ArrowIcon width={30} height={30} color="#1a1a1a" />
      </View>

      <View>
        <Text style={styles.font}>Thông tin cá nhân</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Họ của bạn"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên của bạn"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <View style={{ flexDirection: 'row', zIndex: 50, height:40}}>
          <Text style={{textAlign:'center',marginTop:4}}>Chọn ngày sinh: </Text>
          <TouchableOpacity style={{marginLeft:20, width:230}} onPress={clickMouse}>
            <DateTimePicker style ={{overflow:"visible"}}
              value={birthday}
              mode="date"
              format="dd-MM-yyyy"
              onChange={setBirthday}
              onCalendarClose={clickMouse}
              minDate={new Date(1900,0,1)}
            />
          </TouchableOpacity>

        </View>

      <View style={styles.inputContainer}>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(value) => setGender(value)}
        >
          <Picker.Item label="Nam" value={true} />
          <Picker.Item label="Nữ" value={false} />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  font: {
    fontSize: 28,
    color: '#1a1a1a',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#1c70be',
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Register;
