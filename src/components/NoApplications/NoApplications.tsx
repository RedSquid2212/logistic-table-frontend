'use client';

import {Icon} from '@gravity-ui/uikit';
import {FaceSmile, HandPointDown} from '@gravity-ui/icons';

import './NoApplications.css';

export function NoApplications({isAdmin}: {isAdmin?: boolean}) {
    return (
        <div className={'no-applications'}>
            <p>
                Заявок пока нет...
                {isAdmin ? (
                    <span>
                        {' '}
                        Попробуйте создать заявку <Icon data={HandPointDown} size={20} />
                    </span>
                ) : (
                    <span>
                        {' '}
                        Перейдите в админку, чтобы создать новую заявку{' '}
                        <Icon data={FaceSmile} size={20} />
                    </span>
                )}
            </p>
        </div>
    );
}
