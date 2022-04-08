import React, { useState, useEffect, useRef } from 'react';
import { Image, Modal, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { styles } from '../../styles/style';
import Congratulations from '../Congratulations/index';

function UseCam({dataUser, closeModalPhoto}) {
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [hasPermissionMedia, setHasPermissionMedia] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [openCongratulations, setOpenCongratulations] = useState(false);
  const [receiveData, setReceiveData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      let { statusMedia } = await MediaLibrary.requestPermissionsAsync();
      setHasPermissionMedia(statusMedia === 'granted');

      let { statusLoc }  = await Location.requestForegroundPermissionsAsync();
      if (statusLoc !== 'granted') {
        setErrorMsg('Permissão negada');
      }
    })
    ();
  }, []);
  

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Permissão Negada</Text>;
  }

  async function take() {
    if (ref) {
      const opt = {
        quality: 0.8,
        flexOrientation: true,
        forceUpOrientation: true,
      }
      saveLocation();
      const data = await ref.current.takePictureAsync(opt);
      setCaptured(data.uri)
      setOpen(true)
      
    }
  }

  async function saveLocation() {
    
    let actualLocation = await Location.getCurrentPositionAsync({});
    setLocation(actualLocation.coords);
    
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  }

  async function saveData() {
    const photo = (await MediaLibrary.createAssetAsync(captured)).uri;
    setReceiveData({photo, location, dataUser});
    setOpenCongratulations(!openCongratulations);

  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
              <Text>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTake}
            onPress={take}>
            <Text>Take</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal transparent={true} visible={open} >
        <View style={styles.contentPhoto}>
          <View style={styles.contentPhotoButton}>
            <TouchableOpacity style={styles.buttonClose} onPress={() => setOpen(false)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonConfirm} onPress={saveData}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
          </View>
          <Image style={styles.img} source={{ uri: captured }} />
        </View>
      </Modal>
      <Modal transparent={true} visible={openCongratulations}>
        <Congratulations 
          datas={receiveData}
          closeModalPhoto={closeModalPhoto}
        />
      </Modal>
    </SafeAreaView>
  );
}
export default UseCam;