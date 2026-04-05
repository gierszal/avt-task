import { Pagination } from 'antd';

interface AdvertsPaginationProps{
    current: number,
    total: number,
    onChange: (page: number) => void
}

const AdvertsPagination = ({current, total, onChange}: AdvertsPaginationProps)  => {
    const totalPages = Math.ceil(total/10);

    return (
        <div className={"mt-5 mb-5"}>
            <Pagination defaultCurrent={current} total={totalPages*10} onChange={(page, _)=> onChange(page-1)} />
        </div>
    );
};

export default AdvertsPagination;