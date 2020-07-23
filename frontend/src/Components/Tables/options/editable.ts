import { CommonController } from './../../../controllers/commonController';


export function editable<T> (
        controller: CommonController<T>, 
        callback: () => Promise<void>, 
        onError: (errorMessage: string) => void,
        isValid: (entity: T) => boolean,
        {isRowAdd = true, isRowEdit = true, isRowDelete = true}: {isRowAdd?: boolean, isRowEdit?: boolean, isRowDelete?: boolean}
            ){
            return {
                onRowAdd: isRowAdd ? (newData: T) =>
                new Promise<void>((resolve, reject) => {
                    setTimeout(() => {
                        if(isValid(newData)) {
                            controller.addNew(newData).then(() => {
                                callback().then(() => resolve());
                            }).catch(err => {
                                reject();
                                onError('התרחשה תקלה בשמירת המידע');
                            })
                        } else {
                            reject();
                            onError('לא מולאו את כל שדות החובה!');
                        }
                    }, 600);
                }) : undefined,

                onRowUpdate: isRowEdit ? (newData: T, oldData: T | undefined) =>
                    new Promise<void>((resolve, reject) => {
                        setTimeout(() => {
                            if (oldData) {
                                if(isValid(newData)){
                                    controller.update(newData).then(() => {
                                        callback().then(() => resolve());
                                    }).catch(err => {
                                        resolve();
                                        onError('התרחשה תקלה בשמירת המידע');
                                    })
                                } else {
                                    reject();
                                    onError('לא מולאו את כל שדות החובה!');
                                }
                            } else {
                                reject();
                                onError('לא קיימת עמודה ישנה');
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
                                onError('התרחשה תקלה במחיקת שדרה')
                            })
                        }, 600);
                    }) : undefined,
            }
}