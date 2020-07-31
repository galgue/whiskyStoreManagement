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
                getRowData?: () => Promise<T[]>,
                height?: number,
                onSelectRow?: (entity: T | undefined) => void,
                selectedRow?: T,
                actions?: (Action<T> | ((rowData: T) => Action<T>))[],
                onFinish?: () => void
            } = 
                {isRowAdd: true, isRowEdit: true, isRowDelete: true, 
                    onSelectRow: (entity: T | undefined) => {}, selectedRow: undefined,
                    onFinish: () => {}
                }
            ) {
        return () => {
            const [data, setData] = useState<T[]>([]);
            const [isOpen, setIsOpen] = useState(false);

            const initData = async () => {
                if(options.rowData) {
                    setData(options.rowData)
                } else if(options.getRowDataFromServer) {
                    return  options.getRowDataFromServer().then((data) => {
                        setData(data.data);
                    });
                } else if(options.getRowData) {
                    return options.getRowData().then(result => setData(result));
                } else {
                    return controller.getAll().then(result => setData(result.data))
                }
            };

            const [message, setMessage] = useState('');

            useEffect(() => {
                initData();
            }, []);
    
            return (<>
                <ErrorMessage message={message} isOpen={isOpen} setIsOpen={setIsOpen} />
                <MaterialTable
                    key={JSON.stringify(data)}
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
                                    initData, (message: string) => {
                                        setMessage(message);
                                        setIsOpen(true);
                                        options.onFinish && options.onFinish();
                                    },
                                    isValid, options)}
                />
            </>
            );
        }
    }    
}