import { UserAuthDTO } from './userauth.dto';

export interface TenantDTO {
    userAuthId: number;
    userAuth: UserAuthDTO;
    firstName: string;
    middleName?: string;
    lastName?: string | null;
    phoneNumber: number;
    cid?: string | null;
    profileUri?: string | null;
    signatureUri?: string | null;
    email?: string | null;
    bankName: string | null;
    accountNumber: number | null;
}
