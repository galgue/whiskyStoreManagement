import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { localization } from './options/localization';
import { editable } from './options/editable';
import { tableOptions } from './options/tableOptions';
import { components } from './options/components';
import { style } from './options/style';
import { CommonController } from '../../controllers/commonController';
import { Column } from 'material-table';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ErrorMessage } from '../Dialogs/ErrorMessage';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
 
export const TableFactory = {
    create: function<T extends object>
        (
            title: string, 
            controller: CommonController<T>, 
            tableColumns: Array<Column<T>>,
            isValid: (entity: T) => boolean,
            options: {isRowAdd?: boolean, isRowEdit?: boolean, isRowDelete?: boolean, rowData?: T[]} = 
                {isRowAdd: true, isRowEdit: true, isRowDelete: true}
            ) {
        return () => {
            const [data, setData] = useState<T[]>([]);

            const initData = async () => {
                if(options.rowData) {
                    return new Promise(() =>{}).then(() => {setData(options.rowData as T[])});
                } else {
                    return controller.getAll().then(result => setData(result.data))
                }
            };

            const [message, setMessage] = useState('');

            useEffect(() => {
                initData();
            }, []);
    
            return (<>
                <ErrorMessage message={message} />
                <MaterialTable
                    title={title}
                    style={style}
                    components={components}
                    localization={localization}
                    columns={tableColumns}
                    data={data}
                    options={tableOptions}
                    editable={editable(controller, 
                                    initData, (message: string) => setMessage(message), 
                                    isValid, options)}
                />
            </>
            );
        }
    }    
}