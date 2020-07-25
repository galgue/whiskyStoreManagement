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

export const isValid = ({ firstName, lastName, department, isManager, phone, email}: User) => {
    return !!( firstName && lastName && department  && phone && email)&& isManager ;
}