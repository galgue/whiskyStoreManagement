import React, { useState } from 'react';
import MaterialTable, { Column, Options, MTableCell, MTableEditRow } from 'material-table';
import { Typography } from '@material-ui/core';
import SimpleDialogDemo from '../Dialogs/BarrelBatchesDataDialog';
import { ErrorMessage } from '../Dialogs/ErrorMessage';


export interface chainOfProccessesRow {
    id: number;
    name: string;
    description: string;
    numberOfProccesses: number;
}

interface TableState {
    columns: Array<Column<chainOfProccessesRow>>;
    data: chainOfProccessesRow[];
}

export const ChainOfProccessesTable = () => {
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [state, setState] = useState<TableState>({
        columns: [
            {
                title: 'מק"ט שרשרת תהליך*', field: 'id', type: 'numeric', removable: false,
            },
            {
                title: 'שם שרשרת תהליך*', field: 'name',
            },
            {
                title: 'תיאור שרשרת תהליך*', field: 'description',
            },
            {
                title: 'מספר תהליכים*', field: 'numberOfProccesses', type: 'numeric', removable: false,
            },
        ],
        data: [
            {
                id: 123456,
                name: 'יוסי',
               description:'lfksjflksajdsa',
               numberOfProccesses:4
            },
        ],
    });
    const options: Options<any> = {
        draggable: false,
        headerStyle: {
            textAlign: 'right'
        },
        exportButton: true,
        searchFieldAlignment: "left",
        editCellStyle: {
            textAlign: 'right',
            float: 'right'
        },
    }
    const handleMessageOpen = (isOpen: boolean) => {
        setOpenMessage(isOpen);
    }

    return (<>
     <ErrorMessage onOpen={handleMessageOpen} open={openMessage} message={message} />
        <MaterialTable
            title='ניהול שרשראות תהליכים'
            style={{ direction: 'rtl', textAlign: 'right', alignContent: 'right' }}
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
                    exportAriaLabel: 'ייצא לאקסל',
                    exportName: 'ייצא לאקסל',
                    exportTitle: 'ייצא לאקסל'
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
                    new Promise((resolve,reject) => {
                        const isValid = newData.id
                        && newData.name
                        && newData.numberOfProccesses !== undefined
                        && newData.description;

                        setTimeout(() => {
                            if(isValid){
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }else{
                            reject();
                            setMessage('לא מילאו את כל שדות החובה!');
                            setOpenMessage(true);
                        }
                        }, 600);
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve,reject) => {
                        const isValid = newData.id
                        && newData.name
                        && newData.numberOfProccesses !== undefined
                        && newData.description;
                        setTimeout(() => {
                            if (oldData && isValid) {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }else{
                                reject();
                                setMessage('לא מילאו את כל שדות החובה!');
                                setOpenMessage(true);
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
    </>
    );
}
