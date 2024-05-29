import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Dropdown = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedText, setSelectedText] = useState('');

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleTextSelection = (text) => {
        setSelectedText(text);
        closeModal();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openModal}>
                <View style={styles.rectangleView1}>
                    <Text>{selectedText !== '' ? selectedText : '  Select an option'}</Text>
                    <View style={styles.arrowContainer}>
                        <AntDesign style={styles.arrow} name="down" size={20} color="black" />
                    </View>
                </View>
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide">
                <Pressable style={styles.modalContainer} onPress={closeModal}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => handleTextSelection('  Billboard Owner')}>
                            <Text style={styles.billboardOwner}>Billboard Owner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleTextSelection('  Advertising Agent')}>
                            <Text style={styles.billboardOwner}>Advertising Agent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleTextSelection('  State Agent')}>
                            <Text style={styles.billboardOwner}>State Agent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleTextSelection('  Business Owner')}>
                            <Text style={styles.billboardOwner}>Business Owner</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    rectangleView1: {
        borderRadius: 10,
        backgroundColor: "#f5faff",
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: "rgba(204, 204, 204, 0.25)",
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 1,
        borderStyle: "solid",
        borderColor: "#0080fe",
        marginTop: '5%',
        borderWidth: 1,
        width: "90%",
        height: 40
    },
    arrowContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    arrow: {
        marginRight: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop:"40%"
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#fff",
        padding: 15,
        width: "80%",
        height: "15%",
    },
    billboardOwner: {
        fontSize: 14,
        fontWeight: "500",
        color: "#383838",
        paddingTop: 5
    },
})
export default Dropdown;
