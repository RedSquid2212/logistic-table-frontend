'use client';

import {useAppSelector} from '@/lib/hooks';
import {selectCurrentApplication} from '@/lib/slices/applicationsSlice';

import './ApplicationInfo.css';
import {Link} from '@gravity-ui/uikit';

export function ApplicationInfo() {
    const application = useAppSelector(selectCurrentApplication);

    if (!application) {
        return null;
    }

    return (
        <div className={'info-container'}>
            <p>
                <span className={'info-field'}>Дата и время получения заявки:</span>
                <span className={'info'}>{application.receivingDate}</span>
            </p>
            <p>
                <span className={'info-field'}>Название фирмы клиента:</span>
                <span className={'info'}>{application.clientCompany}</span>
            </p>
            <p>
                <span className={'info-field'}>ФИО перевозчика:</span>
                <span className={'info'}>{application.carrier}</span>
            </p>
            <p>
                <span className={'info-field'}>Контактный телефон перевозчика:</span>
                <span className={'info'}>{application.carrierPhoneNum}</span>
            </p>
            <p>
                <span className={'info-field'}>Комментарии:</span>
                <span className={'info'}>
                    {application.comments.length ? application.comments : '—'}
                </span>
            </p>
            <p>
                <span className={'info-field'}>Статус заявки:</span>
                <span className={'info'}>{application.status}</span>
            </p>
            <p>
                <span className={'info-field'}>ATI код:</span>
                <Link href={application.ati} className={'info'} view={'primary'}>
                    {application.ati}
                </Link>
            </p>
        </div>
    );
}
