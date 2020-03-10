import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Picker, Modal, TouchableHighlight } from 'react-native';

import api from '../services/api';

export default function List() {

// INÍCIO GERENCIAMENTO RAÇAS E LISTA DE IMAGENS
    const [ breed, setBreed ] = useState('chihuahua');
    const [ images, setImages ] = useState([]);

    async function getList() {
        const response = await api.get(`/list?breed=${breed}`);
        setBreed(response.data.breed);
        setImages(response.data.list);
    }

    useEffect(() => {
        getList();
    }, [breed]);

// FIM GERENCIAMENTO DE RAÇAS E LISTA DE IMAGENS

// INÍCIO MODAL

    const [ modalImage, setModalImage ] = useState('');
    const [ modalVisibility, setModalVisibility ] = useState(false);

// FIM MODAL

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={breed}
                style={styles.select}
                onValueChange={breed => setBreed(breed)}
            >
                <Picker.Item label="Chihuaua" value="chihuahua" />
                <Picker.Item label="Husky" value="husky" />
                <Picker.Item label="Labrador" value="labrador" />
                <Picker.Item label="Pug" value="pug" />
            </Picker>

            <FlatList
                numColumns={3}
                style={styles.list}
                data={images}
                keyExtractor={(images, index) => index.toString()}
                vertical
                renderItem={({ item }) => (
                    <View style={styles.imageView}>
                        <TouchableOpacity style={styles.imageTouch} onPress={() => { setModalImage(item); setModalVisibility(true); }}>
                            <Image 
                                style={styles.image} 
                                source={{ uri: item }}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Modal 
                animationType={"slide"} transparent={false}
                hardwareAccelerated={true}
                visible={modalVisibility}
                onRequestClose={() => { setModalImage(null); setModalVisibility(false); }}
            >

                <View style={styles.modal}>
                    <Image
                    style={{ width: '100%', height: 400, resizeMode: 'cover' }}
                    source={{ uri: modalImage }}
                    />

                    <TouchableHighlight style={styles.touchableButton}
                        onPress={() => { setModalImage(null); setModalVisibility(false); }}>
                        <Text style={styles.text}>Fechar</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    select: {
        width: 150,
        fontSize: 20,
        marginTop: 40
    },
    list: {
        flex: 1,
        alignSelf: 'stretch',
        marginTop: 20
    },
    imageView: {
        flex: 1
    },
    imageTouch: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        height: 150,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding : 10,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
    touchableButton: {
        width: '70%',
        padding: 10,
        backgroundColor: '#f07373',
        marginBottom: 10,
        marginTop: 30,
    },
});
