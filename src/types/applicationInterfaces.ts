export type ApplicationStatus = 'новая' | 'в работе' | 'завершено';

export interface IApplication {
    id: number;
    receivingDate: string;
    clientCompany: string;
    carrier: string;
    carrierPhoneNum: string;
    comments: string;
    status: ApplicationStatus;
    ati: string;
    more?: JSX.Element;
}
