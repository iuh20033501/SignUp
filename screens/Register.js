import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity,TouchableWithoutFeedback ,Picker,Modal } from 'react-native';
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
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
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

    await fetch('http://192.168.105.10:8080/api/v1/auth/register', {
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
      setSuccessModalVisible(true)
      console.log('Đăng ký thành công:', data);
    })
    .catch(error => {
      setFailureModalVisible(true)
      console.error(error.message);
    });
  }
  const handleCloseModal = () => {
    setFailureModalVisible(false);
    setSuccessModalVisible(false)
  };
  return (
    <View style={styles.container}>
      {failureModalVisible && (
        <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      {successModalVisible && (
        <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View>
        <TouchableOpacity onPress={() =>  navigation.navigate('Authentication')}>
        <ArrowIcon width={30} height={30} color="#1a1a1a" />
        </TouchableOpacity>
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
        <Text style={{fontSize:10, color:'red',marginTop:2,marginLeft:5}}>Họ là bắt buộc, không được rỗng</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên của bạn"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
         <Text style={{fontSize:10, color:'red',marginTop:2,marginLeft:5}}>Tên là bắt buộc, không được rỗng</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
         <Text style={{fontSize:10, color:'red',marginTop:2,marginLeft:5}}>Mật khẩu từ 8 - 32 ký tự gồm tối thiểu 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 chữ số và 1 ký tự đặc biệt</Text>
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

{/* SUCCESS REGISTER */}
<Modal animationType="slide" transparent={true} visible={successModalVisible} onRequestClose={() => handleCloseModal()} >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent2}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Đăng ký thành công</Text>
            <View style={styles.separator} />
            <Text>• Bây giờ bạn có thể đăng nhập và sử dụng dịch vụ Zalo</Text>
            <Text>• Chúc bạn sử dụng dịch vụ vui vẻ</Text>
            <TouchableOpacity onPress={() => {
              handleCloseModal();
            }}>
              <Text style={{ color: '#0867ef', textAlign: 'center', fontSize: 15, marginTop: 15 }}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* FAIL REGISTER */}
      <Modal animationType="fade" transparent={true} visible={failureModalVisible} onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent2}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Đăng ký thất bại</Text>
            <View style={styles.separator} />
            <Text style={{ fontSize: 13 }}>Có thể bạn đã gặp phải một số trường hợp:</Text>
            <br></br>
            <Text>•	Tuân thủ các quy địch đặt tên, mật khẩu và ngày sinh</Text>
            <Text>• Kiểm tra kết nối mạng</Text>
            <TouchableOpacity onPress={() => handleCloseModal()}>
              <Text style={{ color: '#0867ef', textAlign: 'center', fontSize: 15, marginTop: 15 }}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent2: {
    width: 250,
    height: 240,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    marginVertical: 10,
    marginTop: 20
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
});

export default Register;
