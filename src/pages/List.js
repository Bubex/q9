import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Picker } from 'react-native';

import api from '../services/api';

export default function List() {
    const [ breed, setBreed ] = useState('');
    const [ images, setImages ] = useState([]);

    async function getList() {
        const response = await api.get(`/list?breed=${breed}`);
        setBreed(response.data.breed);
        setImages(response.data.list);
    }

    useEffect(() => {
        getList();
    }, [breed]);

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={breed}
                style={styles.select}
                onValueChange={setBreed}
            >
                <Picker.Item label="Chihuaua" value="chihuaua" />
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
                        <TouchableOpacity style={styles.imageTouch}>
                            {/* <Text>TESTE</Text> */}
                            <Image 
                                style={styles.image} 
                                source={{ uri: item }}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />

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
    }
});
