import React from 'react';
import MaterialTable, { Column, Options, MTableCell } from 'material-table';


interface UserManagementRow {
    id: number;
    firstName: string;
    lastName: string;
    department: string;
    job: string;
    password: string;
    phoneNumber: string;
    email: string;
}

interface TableState {
    columns: Array<Column<UserManagementRow>>;
    data: UserManagementRow[];
}

export const UserManagementTable = () => {
    const [state, setState] = React.useState<TableState>({
        columns: [
            {
                title: 'מספר עובד', field: 'id', type: 'numeric', removable: false,
            },
            {
                title: 'שם פרטי', field: 'firstName',
            },
            {
                title: 'שם משפחה', field: 'lastName',
            },
            {
                title: 'מחלקה', field: 'department',removable: false,
            },
            {
                title: 'עבודה', field: 'job',removable: false,
            },
            {
                title: 'סיסמה', field: 'password',removable: false,
            },
            {
                title: 'מספר טלפון', field: 'phoneNumber',removable: false,
            },
            {
                title: 'מייל', field: 'email',removable: false,
            },
        ],
        data: [
            {
                id: 123456,
                firstName: 'יוסי',
                lastName: 'עזרא',
                department: 'הנהלה',
                job: 'sadasds',
                password: 'efd45435trg',
                phoneNumber: '0525901222',
                email: 'bturuekwe@gmail.com',
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

    return (<>
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
    </>
    );
}
