import React, { useState } from 'react';
import MaterialTable, { Column, Options, MTableCell, MTableEditRow, MTableEditField } from 'material-table';
import { Typography } from '@material-ui/core';
import SimpleDialogDemo from '../Dialogs/BarrelBatchesDataDialog';
import { ErrorMessage } from '../Dialogs/ErrorMessage';


interface CommentsRow {
    id: string;
    BarrelTypeId: string;
    comment: string;
    employeeId: number;
}

interface TableState {
    columns: Array<Column<CommentsRow>>;
    data: CommentsRow[];
}

export const CommentsTable = () => {
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [state, setState] = React.useState<TableState>({
        columns: [
            {
                title: 'מק"ט הערה*', field: 'id', removable: false,
            },
            {
                title: 'מק"ט סוג חבית*', field: 'BarrelTypeId', removable: false,
            },
            {
                title: 'הערה*', field: 'comment', removable: false,
            },
            {
                title: 'מספר עובד כותב הערה*', field: 'employeeId', type: 'numeric', removable: false,
            },
        ],
        data: [
            {
                id: '123456',
                BarrelTypeId: 'ddsfddse32',
                comment: 'sdgerggedfs',
                employeeId: 13214323,
            },
        ],
    });
    const options: Options = {
        draggable: false,
        headerStyle: {
            textAlign: 'right'
        },
        exportButton: true,
        exportAllData:false,
        searchFieldAlignment: "left",
        rowStyle: {
            textAlign: 'right'
        }
    }
    const handleMessageOpen = (isOpen: boolean) => {
        setOpenMessage(isOpen);
    }

    return (<>
        <ErrorMessage onOpen={handleMessageOpen} open={openMessage} message={message} />
        <MaterialTable
            title='הערות'
            style={{ direction: 'rtl', textAlign: 'right', alignContent: 'right' }}
            components={{
                Cell: props => {
                    return (
                        <MTableCell
                            align={'right'}
                            style={{ textAlign: 'right', alignContent: 'right' }}
                            {...props}
                        />
                    );
                },
                EditRow: props => {
                    return (
                        <MTableEditRow
                            align={'right'}
                            style={{ textAlign: 'right', alignContent: 'right' }}
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
                    new Promise((resolve, reject) => {
                        const isValid = newData.id
                            && newData.employeeId
                            && newData.comment
                            && newData.BarrelTypeId;

                        setTimeout(() => {
                            if (isValid) {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                            } else {
                                reject();
                                setMessage('לא מילאו את כל שדות החובה!');
                                setOpenMessage(true);
                            }
                        }, 600);
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        const isValid = newData.id
                            && newData.employeeId
                            && newData.comment
                            && newData.BarrelTypeId;
                        setTimeout(() => {
                            if (oldData && isValid) {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            } else {
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
