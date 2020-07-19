import React, { useState } from 'react';
import MaterialTable, { Column, Options, MTableCell, MTableEditRow } from 'material-table';
import { Typography } from '@material-ui/core';
import SimpleDialogDemo from '../Dialogs/BarrelBatchesDataDialog';


export interface Row {
    id: number;
    barrelType: number;
    chainName: number;
    timeInBarrel: number;
    liquidQuantity: number;
    previousId?: number | null;
    alcoholPercentage: number;
    distillateType: number;
    tableData?: any;
    owner: string;
    location: string;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

export const BatchesTable = () => {
    const [selectedRow, setSelectedRow] = useState<Row>();
    const [openCard, setOpenCard] = useState(false);
    const [state, setState] = React.useState<TableState>({
        columns: [
            {
                title: 'מק"ט', field: 'id', type: 'numeric', removable: false,
            },
            {
                title: 'סוג חבית', field: 'barrelType',
                lookup: { 1: 'אלון', 2: 'cherry' },
            },
            {
                title: 'שם שרשרת', field: 'chainName',

                lookup: { 1: 'סטנדרטי', 2: 'יישון ארוך' },

            },
            {
                title: 'תקופת יישון', field: 'timeInBarrel', type: 'numeric',

            },
            {
                title: 'כמות נוזל במילוי', field: 'liquidQuantity', type: 'numeric',
                cellStyle: {
                    textAlign: 'right'
                }
            },
            {
                title: 'מק"ט אצוות חבית קודמת', field: 'previousId',

                lookup: { 111111: 111111, 222222: 222222 },
            },
            {
                title: 'אחוז אלכוהול במילוי', field: 'alcoholPercentage', type: 'numeric',
            },
            {
                title: 'סוג תזקיק', field: 'distillateType',

                lookup: { 1: 'ניו מייק סינגל מאלט', 2: 'גין לבנטיני', 3: 'סינגל מאלט קאלסי', 4: 'ליקר רוטס' },
            },
            {
                title: 'בעלות', field: 'owner',

            },
            {
                title: 'מיקום חבית במחסן', field: 'location',

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
                location: 'שורה 1 עמודה 2',
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
                location: 'שורה 5 עמודה 4',
                owner: 'יוסי דביר',
                previousId: 123456,
                distillateType: 1
            },
            {
                id: 111111,
                barrelType: 1,
                chainName: 1,
                timeInBarrel: 150,
                liquidQuantity: 130,
                alcoholPercentage: 70,
                distillateType: 1,
                owner: 'מזקקה',
                location: 'שורה 5 עמודה 2'
            },

            {
                id: 111112,
                barrelType: 1,
                chainName: 2,
                timeInBarrel: 150,
                liquidQuantity: 130,
                alcoholPercentage: 70,
                distillateType: 2,
                owner: 'מזקקה',
                location: 'שורה 5 עמודה 4'
            },


            {
                id: 111113,
                barrelType: 2,
                chainName: 2,
                timeInBarrel: 220,
                liquidQuantity: 150,
                previousId: 333333,
                alcoholPercentage: 60,
                distillateType: 2,
                owner: 'מזקקה',
                location: 'שורה 7 עמודה 2'
            },


            {
                id: 111114,
                barrelType: 2,
                chainName: 2,
                timeInBarrel: 300,
                liquidQuantity: 145,
                alcoholPercentage: 55,
                distillateType: 1,
                owner: 'מזקקה',
                location: 'שורה 3 עמודה 1'
            },


            {
                id: 111115,
                barrelType: 2,
                chainName: 2,
                timeInBarrel: 300,
                liquidQuantity: 145,
                alcoholPercentage: 55,
                distillateType: 1,
                owner: 'מזקקה',
                location: 'שורה 3 עמודה 2'
            },

            {
                id: 111116,
                barrelType: 1,
                chainName: 1,
                timeInBarrel: 450,
                liquidQuantity: 100,
                previousId: 111115,
                alcoholPercentage: 55,
                distillateType: 1,
                owner: 'מזקקה',
                location: 'שורה 4 עמודה 5'
            },

            {
                id: 111117,
                barrelType: 1,
                chainName: 1,
                timeInBarrel: 450,
                liquidQuantity: 100,
                alcoholPercentage: 55,
                distillateType: 2,
                owner: 'מזקקה',
                location: 'שורה 5 עמודה 5'
            },

            {
                id: 111118,
                barrelType: 2,
                chainName: 2,
                timeInBarrel: 450,
                liquidQuantity: 130,
                alcoholPercentage: 63,
                distillateType: 1,
                owner: 'מזקקה',
                location: 'שורה 8 עמודה 5'
            },

            {
                id: 111119,
                barrelType: 2,
                chainName: 1,
                timeInBarrel: 660,
                liquidQuantity: 140,
                alcoholPercentage: 63,
                distillateType: 1,
                owner: 'אלי כהן ',
                location: 'שורה 9 עמודה 1'
            },

            {
                id: 111120,
                barrelType: 2,
                chainName: 1,
                timeInBarrel: 660,
                liquidQuantity: 140,
                alcoholPercentage: 63,
                distillateType: 1,
                owner: 'אלי כהן ',
                location: 'שורה 9 עמודה 2'
            },

            {
                id: 111122,
                barrelType: 2,
                chainName: 1,
                timeInBarrel: 500,
                liquidQuantity: 220,
                alcoholPercentage: 80,
                distillateType: 3,
                owner: 'מזקקה',
                location: 'שורה 10 עמודה 2'
            }

        ],
    });
    const options: Options<any> = {
        draggable:false,
        headerStyle: {
            textAlign: 'right'
        },
        exportButton:true,
        searchFieldAlignment: "left",
        rowStyle: (rowData => {
           return {backgroundColor: (selectedRow && selectedRow.id === rowData.id) ? '#EEE' : '#FFF'}
        })
    }

    return (<>
        <MaterialTable
            title='אצוות חביות'
            style={{ direction: 'rtl', textAlign: 'right', alignContent: 'right' }}
            onRowClick={(evt, rowData) => setSelectedRow(rowData)}
            actions={[
                {
                    icon: () => <Typography>נתוני אצוות חבית</Typography>,
                    isFreeAction: true,
                    onClick: () => setOpenCard(true),
                    disabled: selectedRow === undefined
                }
            ]}
            components={{
                Cell: props => {
                    return (
                        <MTableCell
                            style={{ textAlign: 'right' }}
                            {...props}
                        />
                    );
                }
            }}
            localization={{
                toolbar: {
                    searchPlaceholder: 'חפש',
                    exportAriaLabel:'ייצא לאקסל',
                    exportName:'ייצא לאקסל',
                    exportTitle:'ייצא לאקסל'
                },
                body: {
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

                },
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
        <SimpleDialogDemo open={openCard} rowData={selectedRow as Row} />
    </>
    );
}
