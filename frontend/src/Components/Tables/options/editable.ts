import { CommonController } from './../../../controllers/commonController';


export function editable<T> (
        controller: CommonController<T>, 
        callback: () => Promise<void>, 
        failed: () => void,
        {isRowAdd = true, isRowEdit = true, isRowDelete = true}: {isRowAdd?: boolean, isRowEdit?: boolean, isRowDelete?: boolean}
            ){
            return {
                onRowAdd: isRowAdd ? (newData: T) =>
                new Promise<void>((resolve) => {
                    setTimeout(() => {
                        controller.addNew(newData).then(() => {
                            callback().then(() => resolve());
                        }).catch(err => {
                            resolve();
                            failed();
                        })
                    }, 600);
                }) : undefined,

                onRowUpdate: isRowEdit ? (newData: T, oldData: T | undefined) =>
                    new Promise<void>((resolve) => {
                        setTimeout(() => {
                            if (oldData) {
                                controller.update(newData).then(() => {
                                    callback().then(() => resolve());
                                }).catch(err => {
                                    resolve();
                                    failed();
                                })
                            }
                        }, 600);
                    }): undefined,

                onRowDelete: isRowDelete ? (oldData: T) =>
                    new Promise<void>((resolve) => {
                        setTimeout(() => {
                            controller.delete(oldData).then(() => {
                                callback().then(() => resolve());
                            }).catch(err => {
                                resolve();
                                failed();
                            })
                        }, 600);
                    }) : undefined,
            }
}