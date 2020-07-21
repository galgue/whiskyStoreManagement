import React from 'react';
import { Components, MTableCell } from 'material-table';

export const components: Components = {
    Cell: props => {
        return (
            <MTableCell
                style={{ textAlign: 'right' }}
                {...props}
            />
        );
    }
}