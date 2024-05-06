export type ScreenProps = {
	navigation: any;
}

export interface userState {
    id: number,
    name: string,
    description: string,
    puzzle: Array<Array<object>> | null,
    solution: Array<Array<object>> | null
}

type SudokuCell = {
    num: number | null;
    init: boolean;
};

export type SudokuGrid = SudokuCell[][];
