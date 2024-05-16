import {Header} from '@/components/Header/Header';
import {TableHeader} from '@/components/TableHeader/TableHeader';
import {MainTable} from '@/components/MainTable/MainTable';

export default function AdminPage() {
    return (
        <>
            <Header isAdmin={true} />
            <TableHeader />
            <MainTable isAdmin={true} />
        </>
    );
}
