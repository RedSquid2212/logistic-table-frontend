'use client';

import {ArrowUpRightFromSquare} from '@gravity-ui/icons';
import {Icon, Tooltip} from '@gravity-ui/uikit';

export function MoreApplicationInfo({isAdmin}: {isAdmin?: boolean}) {
    return isAdmin ? (
        <div>
            <Icon data={ArrowUpRightFromSquare} />
        </div>
    ) : (
        <div>
            <Tooltip
                content={'Перейдите в админку, чтобы прочитать подробную информацию'}
                placement={'top'}
            >
                <Icon data={ArrowUpRightFromSquare} />
            </Tooltip>
        </div>
    );
}
