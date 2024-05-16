'use client';

import {Button, Modal, Select, TextArea, TextInput} from '@gravity-ui/uikit';
import {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';

import './ApplicationModal.css';
import {ApplicationStatus, IApplication} from '@/types/applicationInterfaces';
import {createApplication, updateServerApplication} from '@/api/api';
import {useRouter} from 'next/navigation';

interface CreateApplicationModalProps {
    id: string;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    application?: IApplication;
}

interface NewApplicationState {
    clientCompany: string;
    carrier: string;
    carrierPhoneNum: string;
    comments: string;
    ati: string;
    status?: ApplicationStatus;
}

export function ApplicationModal({
    id,
    isOpen,
    setIsOpen,
    application,
}: CreateApplicationModalProps) {
    const [newApplication, setNewApplication] = useState<NewApplicationState>({
        clientCompany: (application && application.clientCompany) || '',
        carrier: (application && application.carrier) || '',
        carrierPhoneNum: (application && application.carrierPhoneNum) || '',
        comments: (application && application.comments) || '',
        ati: (application && application.ati) || '',
    });
    const router = useRouter();
    const [selectValue, setSelectValue] = useState(application?.status);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewApplication({...newApplication, [event.target.name]: event.target.value});
    };

    const handleValidation = () => {
        const {clientCompany, carrier, carrierPhoneNum, ati} = newApplication;
        return !(!clientCompany || !carrier || !carrierPhoneNum || !ati);
    };

    const handleSelectChange = (value: string[]) => {
        setSelectValue(value[0] as ApplicationStatus);
    };

    const handleSave = async () => {
        if (application) {
            const updatedValue: Omit<IApplication, 'more' | 'id' | 'receivingDate'> = {
                status: selectValue ?? newApplication.status ?? application.status,
                ...newApplication,
            };
            await updateServerApplication(application.id, updatedValue);
            setIsOpen(false);
            router.replace(`/admin/applications/${id}`);
        } else {
            await createApplication(newApplication);
            setIsOpen(false);
            router.replace('/admin');
        }
        router.refresh();
    };

    return (
        <Modal open={isOpen} onClose={handleClose} contentClassName={'application-modal'}>
            <div className={'content-container'}>
                <h1>Заявка {id}</h1>
                <TextInput
                    size={'l'}
                    placeholder={'Фирма клиента'}
                    name={'clientCompany'}
                    defaultValue={application && application.clientCompany}
                    autoComplete={'off'}
                    onChange={handleFieldChange}
                />
                <TextInput
                    size={'l'}
                    placeholder={'ФИО перевозчика'}
                    name={'carrier'}
                    defaultValue={application && application.carrier}
                    autoComplete={'off'}
                    onChange={handleFieldChange}
                />
                <TextInput
                    size={'l'}
                    placeholder={'Телефон перевозчика'}
                    name={'carrierPhoneNum'}
                    defaultValue={application && application.carrierPhoneNum}
                    autoComplete={'off'}
                    onChange={handleFieldChange}
                />
                <TextArea
                    placeholder={'Комментарии'}
                    size={'l'}
                    minRows={3}
                    name={'comments'}
                    defaultValue={application && application.comments}
                    autoComplete={'off'}
                    onChange={handleFieldChange}
                />
                {application && (
                    <Select
                        placeholder={'status'}
                        defaultValue={[application.status]}
                        width={'max'}
                        name={'status'}
                        onUpdate={handleSelectChange}
                    >
                        <Select.Option value={'новая'}>новая</Select.Option>
                        <Select.Option value={'в работе'}>в работе</Select.Option>
                        <Select.Option value={'завершено'}>завершено</Select.Option>
                    </Select>
                )}
                <TextInput
                    size={'l'}
                    placeholder={'ATI код'}
                    name={'ati'}
                    defaultValue={application && application.ati}
                    autoComplete={'off'}
                    onChange={handleFieldChange}
                />
                <Button
                    view={'action'}
                    size={'l'}
                    className={'save-button'}
                    onClick={handleSave}
                    disabled={!handleValidation()}
                >
                    Сохранить
                </Button>
            </div>
        </Modal>
    );
}
