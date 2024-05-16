import {Application} from '@/components/Application/Application';
import {Header} from '@/components/Header/Header';

export default function ApplicationPage({params}: {params: {id: string}}) {
    return (
        <>
            <Header isAdmin={true} />
            <Application id={params.id} isAdmin={true} />
        </>
    );
}
