'use client';

import {AdminButton} from '@/components/Header/AdminButton/AdminButton';
import {House} from '@gravity-ui/icons';
import {Icon, Link} from '@gravity-ui/uikit';

import './Header.css';

export function Header({isAdmin}: {isAdmin?: boolean}) {
    return (
        <header className={'app-header'}>
            <Link href={isAdmin ? '/admin' : '/'}>
                <Icon data={House} size={30} />
            </Link>
            <AdminButton isAdmin={isAdmin} />
        </header>
    );
}
