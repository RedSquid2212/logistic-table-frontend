'use client';

/*eslint-disable @typescript-eslint/no-unused-expressions*/
import {ApplicationInfo} from '@/components/ApplicationInfo/ApplicationInfo';
import {ApplicationControls} from '@/components/ApplicationControls/ApplicationControls';

import './Application.css';
import {useAppDispatch} from '@/lib/hooks';
import {useRouter} from 'next/navigation';
import {setCurrentApplication} from '@/lib/slices/applicationsSlice';
import {useEffect, useState} from 'react';
import {getCurrentApplication} from '@/api/api';
import {Loader} from '@/components/Loader/Loader';
import {IApplication} from '@/types/applicationInterfaces';
import {Link} from '@gravity-ui/uikit';

export function Application({id, isAdmin}: {id: string; isAdmin?: boolean}) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (!isAdmin) {
        router.replace('/');
    }

    useEffect(() => {
        const fetchFunc = async () => {
            const response = await getCurrentApplication(Number(id));
            response.statusCode
                ? setHasError(true)
                : dispatch(setCurrentApplication(response as IApplication));
            setIsLoading(false);
        };

        fetchFunc();
    }, [dispatch]);

    if (hasError) {
        return (
            <div style={{margin: 20}}>
                <h2>Заявка не найдена</h2>
                <Link href={isAdmin ? '/admin' : '/'}>Перейти на главную</Link>
            </div>
        );
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <h1 style={{margin: '3% 5%', fontSize: '2rem'}}>Заявка {id}</h1>
            <div className={'application-container'}>
                <ApplicationInfo />
                <ApplicationControls isAdmin={isAdmin} />
            </div>
        </>
    );
}
