import React, { useState, useEffect } from 'react';
import MaterialTable, {Action, } from 'material-table';
import { localization } from './options/localization';
import { editable } from './options/editable';
import { tableOptions } from './options/tableOptions';
import { components } from './options/components';
import { style } from './options/style';
import { CommonController } from '../../controllers/commonController';
import { Column } from 'material-table';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ErrorMessage } from '../Dialogs/ErrorMessage';
import { AxiosResponse } from 'axios';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
 
export const TableFactory = {
    create: function<T extends {id: number}>
        (
            title: string, 
            controller: CommonController<T>, 
            tableColumns: Array<Column<T>>,
            isValid: (entity: T) => boolean,
            options: {isRowAdd?: boolean, isRowEdit?: boolean, isRowDelete?: boolean, 
                getRowDataFromServer?: () => Promise<AxiosResponse<T[]>>, 
                rowData?: T[],
                height?: number,
                onSelectRow?: (entity: T | undefined) => void,
                selectedRow?: T,
                actions?: (Action<T> | ((rowData: T) => Action<T>))[]
            } = 
                {isRowAdd: true, isRowEdit: true, isRowDelete: true, 
                    onSelectRow: (entity: T | undefined) => {}, selectedRow: undefined}
            ) {
        return () => {
            const [data, setData] = useState<T[]>([]);

            const initData = async () => {
                if(options.rowData) {
                    setData(options.rowData)
                } else if(options.getRowDataFromServer) {
                    return  options.getRowDataFromServer().then((data) => {
                        setData(data.data);
                    });
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
                    style={options.height? {...style, height: options.height}: style}
                    onRowClick={(evt, rowData) => options.onSelectRow && options.onSelectRow(rowData)}
                    components={components}
                    localization={localization}
                    columns={tableColumns}
                    data={data}
                    actions={options.actions || []}
                    options={{...tableOptions, 
                        rowStyle: (rowData => {
                            return { backgroundColor: 
                                (options.selectedRow && options.selectedRow.id === rowData.id) ? '#EEE' : '#FFF' }
                        })
                    }}
                    editable={editable(controller, 
                                    initData, (message: string) => setMessage(message), 
                                    isValid, options)}
                />
            </>
            );
        }
    }    
}