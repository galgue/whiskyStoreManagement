import React from 'react';
import MaterialTable, { Column, Options, Action } from 'material-table';


interface Row {
    name: string;
    surname: string;
    birthYear: number;
    birthCity: number;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

export const BatchesTable = () => {

    const [state, setState] = React.useState<TableState>({
        columns: [
            {
                title: 'שם', field: 'name', 
                cellStyle: {
                    textAlign: 'right'
                }
            },
            { title: 'שם משפחה', field: 'surname', 
            cellStyle: {
                textAlign: 'right'
            } },
            { title: 'שנת לידה', field: 'birthYear', type: 'numeric', 
            cellStyle: {
                textAlign: 'right'
            } },
            {
                title: 'מקום לידה',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, 
                cellStyle: {
                    textAlign: 'right'
                }
            },
        ],
        data: [
            { name: 'יוסי', surname: 'שמעון', birthYear: 1987, birthCity: 63 },
            {
                name: 'עזרא',
                surname: 'חנן',
                birthYear: 2017,
                birthCity: 34,
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
            title="אצוות חבית"
            style={{ direction: 'rtl', textAlign: 'right' }}
            localization={{
                toolbar: {
                    searchPlaceholder: 'חפש'
                },
                header:{
                    actions:'פעולות'
                },
                pagination:{
                    firstAriaLabel:'שורות',
                    firstTooltip:'עמוד ראשון',
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
