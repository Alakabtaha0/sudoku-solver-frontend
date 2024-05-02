import { View, StyleSheet, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

type SudokuCell = {
    num: number | null;
    init: boolean;
};

type SudokuGrid = SudokuCell[][];

const ConfirmScreen = () => {
    const [sudoku, setSudoku] = useState<SudokuGrid>([
        [
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": 6,
                "init": true
            },
            {
                "num": 6,
                "init": true
            }
        ],
        [
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": 8,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            }
        ],
        [
            {
                "num": 4,
                "init": true
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            }
        ],
        [
            {
                "num": null,
                "init": false
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            }
        ],
        [
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 8,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 8,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            }
        ],
        [
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 8,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 8,
                "init": true
            },
            {
                "num": null,
                "init": false
            }
        ],
        [
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": 8,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": 6,
                "init": true
            }
        ],
        [
            {
                "num": 8,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": 4,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            }
        ],
        [
            {
                "num": 9,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": 9,
                "init": true
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            },
            {
                "num": null,
                "init": false
            }
        ]
    ]);
    const [edit, setEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>('Testing editing function');
    const [description, setDescription] = useState<string>('Testing editing function');

    const editCell = (e: any, row: number, col: number) => {
        if (edit) {
            const newSudoku = sudoku;
            const cell = newSudoku[row][col];
            const text = e.nativeEvent.text;
            if (text === '' || text === '0') {
                cell.num = null;
                cell.init = false;
            } else {
                cell.num = parseInt(text);
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
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Solve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={edit ? styles.selectedButton : styles.button} onPress={() => setEdit(!edit)}>
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
