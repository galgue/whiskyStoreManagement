import React, { useState } from 'react';
import MaterialTable, { Column, Options, MTableCell, MTableEditRow } from 'material-table';
import { Typography } from '@material-ui/core';
import SimpleDialogDemo from '../Dialogs/BarrelBatchesDataDialog';
import { ErrorMessage } from '../Dialogs/ErrorMessage';


interface MissonManagementRow {
    id: number;
    missionSubject: string;
    description: string;
    creationDate: Date;
    reminderDate: Date;
    isCompleted?: boolean;
}

interface TableState {
    columns: Array<Column<MissonManagementRow>>;
    data: MissonManagementRow[];
}

export const MissonManagementTable = () => {
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [state, setState] = useState<TableState>({
        columns: [
            {
                title: 'מק"ט אצוות חבית*', field: 'id', lookup: {
                    1111111: 111111, 2222222: 2222222
                }, removable: false,
            },
            {
                title: 'נושא משימה*', field: 'missionSubject',
            },
            {
                title: 'תיאור משימה', field: 'description',
            },
            {
                title: 'נוצרה בתאריך*', field: 'creationDate', type: 'date',
            },
            {
                title: 'תאריך תזכורת*', field: 'reminderDate', type: 'date',
            },
            {
                title: 'האם הושלמה', field: 'isCompleted', type: 'boolean',
            },
        ],
        data: [
            {
                id: 123456,
                description: 'יוסי',
                missionSubject: 'fdsfsd',
                creationDate: new Date(2018, 11, 24, 10, 33, 30),
                reminderDate: new Date(2019, 11, 24, 10, 33, 30),
                isCompleted: false
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
            title='ניהול משימות'
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
                        if(newData.isCompleted === undefined){
                            newData.isCompleted = false;
                        }
                        setTimeout(() => {
                            const isValid = newData.id 
                            && newData.creationDate 
                            && newData.missionSubject
                            && newData.reminderDate;

                            if (isValid) {
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
                        setTimeout(() => {
                            const isValid = newData.id 
                            && newData.creationDate 
                            && newData.missionSubject
                            && newData.reminderDate;
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
