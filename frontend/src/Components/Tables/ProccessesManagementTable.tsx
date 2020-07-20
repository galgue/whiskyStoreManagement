import React, { useState } from 'react';
import MaterialTable, { Column, Options, MTableCell } from 'material-table';
import { ErrorMessage } from '../Dialogs/ErrorMessage';


interface ProccessesManagementRow {
    id: number;
    name: string;
    description: string;
    duration: number;
}

interface TableState {
    columns: Array<Column<ProccessesManagementRow>>;
    data: ProccessesManagementRow[];
}

export const ProccessesManagementTable = () => {
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [state, setState] = useState<TableState>({
        columns: [
            {
                title: 'מק"ט תהליך*', field: 'id', type: 'numeric', removable: false,
            },
            {
                title: 'שם תהליך*', field: 'name',
            },
            {
                title: 'תיאור תהליך*', field: 'description',
            },
            {
                title: 'משך*', field: 'duration', type: 'numeric', removable: false,
            },
        ],
        data: [
            {
                id: 123456,
                name: 'יוסי',
                description: 'lfksjflksajdsa',
                duration: 600
            },
        ],
    });
    const options: Options = {
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
            title='ניהול תהליכים'
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
                    new Promise((resolve, reject) => {
                        const isValid = newData.id
                            && newData.description
                            && newData.duration
                            && newData.name;

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
                    new Promise((resolve,reject) => {
                        const isValid = newData.id
                            && newData.description
                            && newData.duration
                            && newData.name;
                        setTimeout(() => {
                            resolve();
                            if (oldData && isValid) {
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
