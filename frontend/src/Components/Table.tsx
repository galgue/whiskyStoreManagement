import React from 'react';
import MaterialTable, { Column, Options, Action } from 'material-table';


interface Row {
    id: number;
    barrelType: number;
    chainName: number;
    timeInBarrel: number;
    liquidQuantity: number;
    previousId: number;
    alcoholPercentage: number;
    distillateType: number;
    owner: string;
    location: string;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

export const BatchesTable = () => {

    const [state, setState] = React.useState<TableState>({
        columns: [
            {
                title: 'מק"ט', field: 'id', type: 'numeric',
                cellStyle: {
                    textAlign: 'right'
                }
            },
            {
                title: 'סוג חבית', field: 'barrelType',
                cellStyle: {
                    textAlign: 'right'
                },
                lookup: { 1: 'אלון', 2: 'cherry' },
            },
            {
                title: 'שם שרשרת', field: 'chainName',
                cellStyle: {
                    textAlign: 'right'
                },
                lookup: { 1: 'סטנדרטי', 2: 'יישון ארוך' },
            },
            {
                title: 'תקופת יישון', field: 'timeInBarrel', type: 'numeric',
                cellStyle: {
                    textAlign: 'right'
                }
            },
            {
                title: 'כמות נוזל במילוי', field: 'liquidQuantity', type: 'numeric',
                cellStyle: {
                    textAlign: 'right'
                }
            },
            {
                title: 'מק"ט אצוות חבית קודמת', field: 'previousId',
                cellStyle: {
                    textAlign: 'right'
                },
                lookup: {111111:111111,222222:222222},
            },
            {
                title: 'אחוז אלכוהול במילוי', field: 'alcoholPercentage', type: 'numeric',
                cellStyle: {
                    textAlign: 'right'
                }
            },
            {
                title: 'סוג תזקיק', field: 'distillateType',
                cellStyle: {
                    textAlign: 'right'
                },
                lookup: {1:'ניו מייק סינגל מאלט',2:'גין לבנטיני',3:'סינגל מאלט קאלסי',4:'ליקר רוטס'},
            },
            {
                title: 'בעלות', field:'owner',
                cellStyle: {
                    textAlign: 'right'
                }
            },
            {
                title: 'מיקום חבית במשרד', field:'location',
                cellStyle: {
                    textAlign: 'right'
                }
            },
        ],
        data: [
            {
                id: 123456,
                barrelType: 2,
                chainName: 2,
                timeInBarrel: 345,
                liquidQuantity: 120,
                alcoholPercentage: 35,
                location: 'אזור א',
                owner: 'יוסי דביר',
                previousId: 222222,
                distillateType: 2
            },
            {
                id: 222222,
                barrelType: 1,
                chainName: 1,
                timeInBarrel: 123,
                liquidQuantity: 230,
                alcoholPercentage: 40,
                location: 'אזור א',
                owner: 'יוסי דביר',
                previousId: 123456,
                distillateType: 1
            },
        ],
    });
    const options: Options = {
        headerStyle: {
            textAlign: 'right'
        }
    }

    return (
        <MaterialTable
            title='אצוות חביות'
            style={{ direction: 'rtl'}}
            localization={{
                toolbar: {
                    searchPlaceholder: 'חפש',
                },
                body:{
                    addTooltip: 'הוסף',
                  deleteTooltip: 'מחק',
                  editTooltip: 'ערוך',
                  editRow: {
                    deleteText: 'האם את\\ה בטוח\\ה?',
                    cancelTooltip: 'בטל',
                    saveTooltip: 'שמור',
                  },
                },
                header: {
                    actions: 'פעולות'
                },
                pagination: {
                    firstAriaLabel: 'שורות',
                    firstTooltip: 'עמוד ראשון',
                    labelDisplayedRows: '{from}-{to} מתוך {count}',
                    labelRowsPerPage: 'שורות בכל עמוד',
                    labelRowsSelect: 'שורות',
                    lastTooltip: 'עמוד אחרון',
                    nextTooltip: 'עמוד הבא',
                    previousTooltip: 'עמוד קודם',

                }
            }}
            columns={state.columns}
            data={state.data}
            options={options}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}
