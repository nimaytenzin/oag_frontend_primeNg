import { USERROLES } from '../../constants/enums';

export interface UserDto {
    fullName: string;
    email: string;
    role: USERROLES;
}
