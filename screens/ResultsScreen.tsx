import { ScreenProps } from '../utils/types';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { SudokuGrid } from '../utils/types';
import { useDispatch } from 'react-redux';
import { resetUser } from '../redux/userSlice';
import Svg, { Path } from 'react-native-svg';
import { store } from '../redux/store';

const ResultsScreen: React.FC<ScreenProps> = ({ navigation }) => {
    const name: string = useSelector((state: any) => state.user.name);
    const description: string = useSelector((state: any) => state.user.description);
    const completedSudoku: SudokuGrid = useSelector((state: any) => state.user.solution);
    const dispatch = useDispatch();

    const renderGrid = () => {
        return completedSudoku.map((row, rowIndex) => {
            return (
                <View key={rowIndex} style={styles.row}>
                    {
                        row.map((cell, colIndex) => {
                            return (
                                <View
                                    key={colIndex}
                                    style={[styles.cell, { backgroundColor: cell.init ? 'gray' : 'white' }]}>
                                    <Text>{cell.num}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            )
        })
    }
    // Goes back to main camera screen
    const backToStart = () => {
        dispatch(resetUser());
        navigation.navigate('Camera');
    }

    return (
        <View style={styles.container}>
            <View style={styles.arrow} onTouchStart={backToStart}>
                <Svg width="35" height="35" viewBox="0 0 50 50">
                    <Path d="M35 10 L15 25 L35 40" stroke="white" strokeWidth="6" fill="none" />
                </Svg>
            </View>
            <Text style={styles.headerText}>Completed!</Text>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{description}</Text>
            <View style={styles.sudokuContainer}>
                {renderGrid()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        position: 'absolute',
        top: 95,
        left: 25,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 15,
        borderBottomWidth: 0,
        borderLeftWidth: 15,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'white',
    },
});


export default ResultsScreen;
