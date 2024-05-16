'use client';

/*eslint-disable @typescript-eslint/no-unused-expressions*/
import './TableHeader.css';
import {Icon, Tooltip} from '@gravity-ui/uikit';
import {Eye, EyeSlash} from '@gravity-ui/icons';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {
    getActiveApplications,
    getAllApplications,
    selectApplications,
} from '@/lib/slices/applicationsSlice';
import {useState} from 'react';

export function TableHeader() {
    const dispatch = useAppDispatch();
    const [isHided, setIsHided] = useState(false);
    const currentApplications = useAppSelector(selectApplications);

    const handleHide = () => {
        isHided ? dispatch(getAllApplications()) : dispatch(getActiveApplications());
        setIsHided(!isHided);
    };

    return (
        <div className={'table-header'}>
            <h2>Заявки</h2>
            <div className={'controls'}>
                <span className={'counter'}>Всего заявок: {currentApplications.length}</span>
                <Tooltip
                    placement={'top'}
                    content={isHided ? 'Показать все заявки' : 'Скрыть выполненные заявки'}
                >
                    <div onClick={handleHide} className={'hide-button'}>
                        {isHided ? (
                            <Icon data={Eye} size={30} />
                        ) : (
                            <Icon data={EyeSlash} size={30} />
                        )}
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}
