import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View, TextInput, Button, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './src/styles/style';
import UseCam from './src/components/Camera/index';

export default function App() {

  const [dataUser, setDataUser] = useState({});
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [descricao, setDescricao] = useState('');

  const [isVisible, setIsVisible] = useState(false);

  function saveDataForm() {
    setIsVisible(!isVisible);
    setDataUser({cidade, 
      bairro, 
      rua, 
      numero, 
      descricao
    });
  }

  function closeModalPhoto() {
    setDataUser({})
    setCidade('default');
    setBairro(''); 
    setRua('');
    setNumero('');
    setDescricao('');
    setIsVisible(!isVisible);
  }

  return (
    <View style={styles.container}>
      <Picker
      style={styles.inputPicker}
      selectedValue={cidade}
      onValueChange={(city) => setCidade(city)}
      mode={'dialog'}
      >   
        <Picker.Item label="Selecione uma cidade:" value="default" />
        <Picker.Item label="Vassouras" value="Vassouras" />
        <Picker.Item label="Barra do Pirai" value="Barra do Pirai" />
        <Picker.Item label="Mendes" value="Mendes" />
        <Picker.Item label="Três Rios" value="Três Rios" />
        <Picker.Item label= "Paraíba do Sul" value="Paraíba do Sul" />
        <Picker.Item label= "Miguel Pereira" value="Miguel Pereira" />
        <Picker.Item label= "Valença" value="Valença" />
        <Picker.Item label= "Rio das Flores" value="Rio das Flores" />
      </Picker>
      <Text>Informe o bairro</Text>
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
      />
      <Text>Informe a rua</Text>
      <TextInput
        style={styles.input}
        placeholder="Rua"
        value={rua}
        onChangeText={setRua}
      />
      <Text>Informe o numero</Text>
      <TextInput
        style={styles.input}
        placeholder="Numero"
        keyboardType="numeric"
        value={numero}
        onChangeText={setNumero}
      />
      <Text>Descrição</Text>
      <TextInput
        style={styles.inputArea}
        value={descricao}
        onChangeText={setDescricao}
      />
      <StatusBar style="auto" />
      <Button
        onPress={saveDataForm}
        title="Notificar"
        color="#841584"
      />
      <Modal transparent={true} visible={isVisible}>
        <UseCam 
          dataUser={dataUser}
          closeModalPhoto={closeModalPhoto}
        />
      </Modal>
    </View>
  );
}
