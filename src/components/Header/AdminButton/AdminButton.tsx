'use client';

/*eslint-disable @typescript-eslint/no-unused-expressions*/
import {Button} from '@gravity-ui/uikit';
import {useRouter} from 'next/navigation';

export function AdminButton({isAdmin}: {isAdmin?: boolean}) {
    const router = useRouter();
    const handleClick = () => {
        isAdmin ? router.replace('/') : router.replace('/admin');
    };

    return (
        <Button view={'action'} onClick={handleClick}>
            {isAdmin ? 'Выйти из админки' : 'Перейти в админку'}
        </Button>
    );
}
