import { ScreenProps } from '../utils/types';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { store } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { patchData, postData } from '../utils/apiCalls';
import { SudokuGrid } from '../utils/types';
import { setUser, setSolution } from '../redux/userSlice';


const ConfirmScreen: React.FC<ScreenProps> = ({ navigation }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>(useSelector((state: any) => state.user.name));
    const [description, setDescription] = useState<string>(useSelector((state: any) => state.user.description));
    const [sudoku, setSudoku] = useState<SudokuGrid>(useSelector((state: any) => state.user.puzzle));
    const id = useSelector((state: any) => state.user.id);
    const dispatch = useDispatch();

    const confirmEdit = () => {
        // Send the data to the server
        const updateData = {
            name: name,
            description: description,
            puzzle: sudoku
        }
        // Post the data to the server
        patchData('http://192.168.1.23:8000/sudokus/', updateData, id)
        .then(data => {
            dispatch(setUser(data));
        }).catch(err => console.error(err));
        setEdit(false);
    }

    const solveSudoku = () => {
        // Send puzzle to the server
        postData('http://192.168.1.23:8000/sudokus/solve/', {
            "puzzle": sudoku,
        }, 60)
        .then(data => {
            dispatch(setSolution(data.solution));
            navigation.navigate('Results');
        }).catch(err => console.error(err));
    }

    const editCell = (e: any, row: number, col: number) => {
        if (edit) {
            const newSudoku = sudoku.map(row => row.map(cell => ({...cell})));
            const cell = newSudoku[row][col];
            const text = e.nativeEvent.text;
            if (text === '' || text === '0') {
                cell.num = null;
                cell.init = false;
            } else {
                cell.num = parseInt(text);
                if (cell.init === false) cell.init = true;
            }
            setSudoku(newSudoku);
        }
    }

    const renderGrid = () => {
        return sudoku.map((row, rowIndex) => {
            return (
                <View key={rowIndex} style={styles.row}>
                    {
                        row.map((cell, colIndex) => {
                            return (
                                <TextInput onEndEditing={(e) => editCell(e, rowIndex, colIndex)}
                                    key={colIndex}
                                    style={[styles.cell, { backgroundColor: cell.init ? 'gray' : 'white' }]}
                                    maxLength={1}
                                    keyboardType='numeric' 
                                    returnKeyType='done' >
                                    <Text>{cell.num}</Text>
                                </TextInput>
                            )
                        })
                    }
                </View>
            )
        })
    }

    return (
        <View style={styles.container}>
            {!edit && <View style={styles.inputBlock}></View>}
            <Text style={styles.headerText}>Everything correct?</Text>
            <TextInput style={styles.textBox} value={name} onChangeText={setName} placeholder='Enter the name of this sudoku' returnKeyType='done' />
            <TextInput style={styles.textBox} value={description} onChangeText={setDescription} placeholder='Enter the description' returnKeyType='done' />
            <View style={styles.sudokuContainer}>
                {renderGrid()}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={solveSudoku}>
                    <Text style={styles.text}>Solve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={edit ? styles.selectedButton : styles.button} onPress={edit ? confirmEdit : () => setEdit(!edit)}>
                    <Text style={styles.text}>{edit ? 'Confirm' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputBlock: {
        width: '100%',
        height: '70%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 10,
        zIndex: 100,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#001426'
    },
    sudokuContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
        marginBottom: 150
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 100,
        marginBottom: 30
    },
    textBox: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: 'white',
        width: '80%'
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 40,
        height: 40,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#261200',
        width: 100,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    selectedButton: {
        backgroundColor: '#4A4A4A',
        width: 100,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
});

export default ConfirmScreen
