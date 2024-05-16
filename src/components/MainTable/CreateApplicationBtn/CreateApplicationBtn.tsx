'use client';

import {Button} from '@gravity-ui/uikit';

import './CreateApplicationBtn.css';
import {ApplicationModal} from '@/components/ApplicationModal/ApplicationModal';
import {useState} from 'react';

export function CreateApplicationBtn() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(true);
    };

    return (
        <div className={'create-application-button'}>
            <Button view={'action'} size={'xl'} onClick={handleClick}>
                + Создать заявку
            </Button>
            <ApplicationModal id={'1'} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
}
