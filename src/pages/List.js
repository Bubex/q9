import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Picker,
    Modal,
    TouchableHighlight,
    ActivityIndicator
} from "react-native";

import api from "../services/api";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch"
    },
    select: {
        width: 150,
        fontSize: 20,
        marginTop: 40
    },
    list: {
        flex: 1,
        alignSelf: "stretch",
        marginTop: 20
    },
    imageView: {
        flex: 1
    },
    imageTouch: {
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        height: 150
    },
    modal: {
        flex: 1
    },
    modalView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center"
    },
    touchableButton: {
        width: "70%",
        padding: 10,
        backgroundColor: "#f07373",
        marginBottom: 10,
        marginTop: 30
    },
    loading: {
        paddingVertical: 50
    },
    loadingModal: {
        flex: 1
    },
    loadingViewModal: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        alignItems: "center",
        justifyContent: "center"
    },
    loadingIndicator: {
        // flex: 1,
        width: 100,
        height: 100
    }
});

export default function List() {
    const [loadingView, setLoadingView] = useState(true);

    const [modalImage, setModalImage] = useState("");
    const [modalVisibility, setModalVisibility] = useState(false);

    const [breed, setBreed] = useState("chihuahua");
    const [images, setImages] = useState([]);
    const [loadingImages, setLoadingImages] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedImages, setDisplayedImages] = useState([]);
    const sizePerPage = 9;

    async function getList() {
        setLoadingImages(true);

        const response = await api.get(`/list?breed=${breed}`);

        setBreed(response.data.breed);
        setImages(response.data.list);
        setCurrentPage(1);
        setDisplayedImages(response.data.list.slice(0, sizePerPage));

        setLoadingImages(false);
        setLoadingView(false);
    }

    useEffect(() => {
        setLoadingView(true);
        getList();
    }, [breed]);

    function loadMoreImages() {
        if (loadingImages) return;

        setLoadingImages(true);
        setDisplayedImages(
            displayedImages.concat(
                images.slice(
                    currentPage * sizePerPage,
                    currentPage * sizePerPage + sizePerPage
                )
            )
        );
        setCurrentPage(currentPage + 1);
        setLoadingImages(false);
    }

    function renderFooter() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={breed}
                style={styles.select}
                onValueChange={_breed => setBreed(_breed)}
            >
                <Picker.Item label="Chihuaua" value="chihuahua" />
                <Picker.Item label="Husky" value="husky" />
                <Picker.Item label="Labrador" value="labrador" />
                <Picker.Item label="Pug" value="pug" />
            </Picker>

            <FlatList
                numColumns={3}
                style={styles.list}
                data={displayedImages}
                keyExtractor={(_displayedImages, index) => index.toString()}
                onEndReached={loadMoreImages}
                onEndReachedThreshold={0.05}
                ListFooterComponent={renderFooter}
                renderItem={({ item }) => (
                    <View style={styles.imageView}>
                        <TouchableOpacity
                            style={styles.imageTouch}
                            onPress={() => {
                                setModalImage(item);
                                setModalVisibility(true);
                            }}
                        >
                            <Image
                                style={styles.image}
                                source={{ uri: item }}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Modal
                animationType="slide"
                transparent
                hardwareAccelerated
                visible={modalVisibility}
                onRequestClose={() => {
                    setModalImage(null);
                    setModalVisibility(false);
                }}
                style={styles.modal}
            >
                <View style={styles.modalView}>
                    <Image
                        style={{
                            width: "100%",
                            height: 400,
                            resizeMode: "cover"
                        }}
                        source={{ uri: modalImage }}
                    />

                    <TouchableHighlight
                        style={styles.touchableButton}
                        onPress={() => {
                            setModalImage(null);
                            setModalVisibility(false);
                        }}
                    >
                        <Text style={styles.text}>Fechar</Text>
                    </TouchableHighlight>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent
                hardwareAccelerated
                visible={loadingView}
                style={styles.loadingModal}
            >
                <View style={styles.loadingViewModal}>
                    <ActivityIndicator
                        size="large"
                        style={styles.loadingIndicator}
                    />
                </View>
            </Modal>
        </View>
    );
}
