'use client';

import {Button, Icon} from '@gravity-ui/uikit';
import {PencilToLine, TrashBin} from '@gravity-ui/icons';

import './ApplicationControls.css';
import {useState} from 'react';
import {ApplicationModal} from '@/components/ApplicationModal/ApplicationModal';
import {useAppSelector} from '@/lib/hooks';
import {selectCurrentApplication} from '@/lib/slices/applicationsSlice';
import {ConfirmDeletionModal} from '@/components/ApplicationControls/ConfirmDeletionModal/ConfirmDeletionModal';

export function ApplicationControls({isAdmin}: {isAdmin?: boolean}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const currentApplication = useAppSelector(selectCurrentApplication);

    if (!currentApplication) {
        return null;
    }

    const handleUpdate = () => {
        setIsOpen(true);
    };

    const handleDelete = () => {
        setIsOpenConfirm(true);
    };

    return (
        <>
            <div className={'app-controls'}>
                <Button view={'outlined-action'} size={'l'} onClick={handleUpdate}>
                    <Icon data={PencilToLine} size={18} />
                    Редактировать
                </Button>
                <Button view={'outlined-danger'} size={'l'} onClick={handleDelete}>
                    <Icon data={TrashBin} size={18} />
                    Удалить
                </Button>
            </div>
            <ApplicationModal
                id={currentApplication.id.toString()}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                application={currentApplication}
            />
            <ConfirmDeletionModal
                id={currentApplication.id.toString()}
                isOpen={isOpenConfirm}
                setIsOpen={setIsOpenConfirm}
                isAdmin={isAdmin}
            />
        </>
    );
}
