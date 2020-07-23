import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import MaterialTable, { MTableCell, Column, Options } from 'material-table';
import { ErrorMessage } from './ErrorMessage';

const useStyles = makeStyles({
    button: {
        marginTop: '1em'
    },
    message: {
        textAlign: 'center',
        padding: '1em'
    },
    title: {
        paddingTop: '1em',
        textAlign: 'center'
    }
});

export interface SimpleDialogProps {
    open: boolean;
    rowId: string;
    onOpen: (isOpen: boolean) => void
}

interface CommentsRow {
    comment: string;
    writer: string;
}

interface TableState {
    columns: Array<Column<CommentsRow>>;
    data: CommentsRow[];
}

export const CommentsDialog = (props: SimpleDialogProps) => {
    const classes = useStyles();
    const { open, rowId, onOpen } = props;
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [state, setState] = useState<TableState>({
        columns: [
            {
                title: 'הערה', field: 'comment', removable: false,
            },
            {
                title: 'כותב ההערה', field: 'writer', removable: false,
            }
        ],
        data: [
            {
                comment: 'fdfdfdsfd',
                writer: 'gfgfdgd'
            },
        ],
    });
    const options: any = {
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
        filtering: true,

    }

    const handleMessageOpen = (isOpen: boolean) => {
        setOpenMessage(isOpen);
    }


    return ( <>
            {/* <ErrorMessage onOpen={handleMessageOpen} open={openMessage} message={message} /> */}
            <Dialog aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle className={classes.title} id="simple-dialog-title">הערות אצוות חבית {rowId}</DialogTitle>
                <MaterialTable
                    title={' '}
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
                            emptyDataSourceMessage: 'לא נמצאו שורות'
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
                                setTimeout(() => {
                                    const isValid = newData.comment
                                        && newData.writer;
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
                                setTimeout(() => {
                                    const isValid = newData.comment
                                        && newData.writer;
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
                <Button color='primary' onClick={() => onOpen(false)} className={classes.button}>סגור</Button>
            </Dialog>
        </>
    );
}