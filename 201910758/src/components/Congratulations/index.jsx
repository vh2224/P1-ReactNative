import React from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import { styles } from '../../styles/style';


function Congratulations({datas, closeModalPhoto}) {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase'}}>Obrigado por cadastrar a notificacao! Segue os dados da ocorrencia</Text>
            <Text style={styles.textCongratulations}>{`Cidade: ${datas.dataUser.cidade}`}</Text>
            <Text style={styles.textCongratulations}>{`Bairro: ${datas.dataUser.bairro}`}</Text>
            <Text style={styles.textCongratulations}>{`Rua: ${datas.dataUser.rua}`}</Text>
            <Text style={styles.textCongratulations}>{`Numero: ${datas.dataUser.numero}`}</Text>
            <Text style={styles.textCongratulations}>{`Descricao: ${datas.dataUser.descricao}`}</Text>
            <Text style={styles.textCongratulations}>{`Localização: Latitude=${datas.location.latitude}, Longitude=${datas.location.longitude}`}</Text>
            <Text style={styles.textCongratulations}>{`Foto: ${datas.photo}`}</Text>
            <Button
                onPress={closeModalPhoto}
                title="Fechar Notificação"
                color="#841584"
            />
        </SafeAreaView>
    );
}

export default Congratulations;