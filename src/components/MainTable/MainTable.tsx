'use client';

import {Link, Table} from '@gravity-ui/uikit';

import './MainTable.css';
import {CreateApplicationBtn} from '@/components/MainTable/CreateApplicationBtn/CreateApplicationBtn';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {selectApplications, setApplications} from '@/lib/slices/applicationsSlice';
import {NoApplications} from '@/components/NoApplications/NoApplications';
import {useEffect, useState} from 'react';
import {getApplications} from '@/api/api';
import {IApplication} from '@/types/applicationInterfaces';
import {Loader} from '@/components/Loader/Loader';
import {MoreApplicationInfo} from '@/components/MainTable/MoreApplicationInfo/MoreApplicationInfo';

interface IColumn {
    id: string;
    name?: string;
    align?: 'center' | 'left' | 'right';
    width?: number | string;
}

interface ITableData extends Omit<IApplication, 'ati'> {
    ati: JSX.Element;
}

export function MainTable({isAdmin}: {isAdmin?: boolean}) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFunc = async () => {
            const response = (await getApplications()) as IApplication;
            dispatch(setApplications(response));
            setIsLoading(false);
        };

        fetchFunc();
    }, [dispatch]);

    const currentApplications = useAppSelector(selectApplications);

    if (isLoading) {
        return <Loader />;
    }

    const data: ITableData[] = currentApplications.map((item) => ({
        ...item,
        ati: (
            <Link href={item.ati} view={'primary'} target={'_blank'}>
                {item.ati}
            </Link>
        ),
        more: isAdmin ? (
            <Link href={`/admin/applications/${item.id}`}>
                <MoreApplicationInfo isAdmin={isAdmin} />
            </Link>
        ) : (
            <MoreApplicationInfo isAdmin={isAdmin} />
        ),
    }));

    const columns: IColumn[] = [
        {id: 'id', name: 'Номер заявки', align: 'center'},
        {id: 'receivingDate', name: 'Дата получения', align: 'center'},
        {id: 'clientCompany', name: 'Фирма клиента', align: 'center'},
        {id: 'carrier', name: 'ФИО перевозчика', align: 'center', width: 200},
        {id: 'carrierPhoneNum', name: 'Телефон перевозчика', align: 'center'},
        {id: 'comments', name: 'Комментарии', align: 'center'},
        {id: 'status', name: 'Статус заявки', align: 'center'},
        {id: 'ati', name: 'ATI код', align: 'center'},
        {id: 'more', name: 'Подробнее', align: 'center'},
    ];
    return (
        <>
            {currentApplications.length ? (
                <Table data={data} columns={columns} className={'main-table'} />
            ) : (
                <NoApplications isAdmin={isAdmin} />
            )}
            {isAdmin && <CreateApplicationBtn />}
        </>
    );
}
