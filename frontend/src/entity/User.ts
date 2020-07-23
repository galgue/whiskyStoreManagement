export interface User {
    id: number;
    firstName: string;
    lastName: string;
    department: string;
    isManager: boolean;
    phone: string;
    email: string;
    password: string;
}

export const isValid = ({id, firstName, lastName, department, isManager, phone, email}: User) => {
    return !!(id && firstName && lastName && department && isManager && phone && email);
}