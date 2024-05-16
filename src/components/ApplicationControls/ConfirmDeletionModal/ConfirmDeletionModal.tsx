'use client';

import {Button, Modal} from '@gravity-ui/uikit';
import {Dispatch, SetStateAction} from 'react';

import './ConfirmDeletionModal.css';
import {deleteApplication} from '@/api/api';
import {useRouter} from 'next/navigation';

interface ConfirmDeletionModalProps {
    id: string;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isAdmin?: boolean;
}

export function ConfirmDeletionModal({id, isOpen, setIsOpen, isAdmin}: ConfirmDeletionModalProps) {
    const router = useRouter();

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDelete = async () => {
        await deleteApplication(Number(id));
        setIsOpen(false);
        router.replace(isAdmin ? '/admin' : '/');
    };

    return (
        <Modal contentClassName={'confirm-modal'} onClose={handleClose} open={isOpen}>
            <div className={'confirm-modal-content'}>
                <h2>Удалить заявку {id}?</h2>
                <div className={'confirm-buttons'}>
                    <Button view={'outlined-danger'} onClick={handleDelete}>
                        Да
                    </Button>
                    <Button view={'outlined'} onClick={handleClose}>
                        Нет
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
