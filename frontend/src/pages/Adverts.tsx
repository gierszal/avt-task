import SearchInput from "../components/SearchInput.tsx";
import SideBar from "../components/SideBar.tsx";
import AdvertsList from "../components/AdvertsList.tsx";
import AdvertsPagination from "../components/AdvertsPagination.tsx";
import {useGetAds} from "../hooks/useAds.ts";
import {Skeleton} from "antd";
import {useState} from "react";
import {MehOutlined} from "@ant-design/icons";

const Adverts = () => {

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [query, setQuery] = useState<string>("");
    const [onlyRevision, setOnlyRevision] = useState<boolean>(false)
    const [sortCol, setCol] = useState<"title" | "createdAt" | undefined>(undefined);
    const [sortDir, setDir] = useState<"asc" | "desc" | undefined>(undefined);
    const [categories, setCategories] = useState<string[]>([]);

    const [gridLayout, setGridLayout] = useState<boolean>(true);

    const {data ,isLoading, isError, error} = useGetAds({skip:currentPage, limit:10,
        q: query, needsRevision: onlyRevision,
        sortColumn: sortCol, sortDirection: sortDir,
        categories: categories,
    });

    const [resetKey, setResetKey] = useState(0);

    const dropFilters = () => {
        setOnlyRevision(false);
        setCategories([]);
        setResetKey(prev => prev + 1);
    }


    if(isLoading) return <div className={"mt-10 ml-10 w-[90%]"}><Skeleton /></div>
    if(isError) return <div>Error: {error?.message}</div>


    return (
        <>
            <div className={"flex flex-col ml-10 mt-5"}>
                <h2 className={"text-xl font-semibold"}>Мои объявления</h2>
                <p className={"text-gray-500"}>{data?.items.total} объявления</p>
            </div>

            <div className="flex justify-center mt-5 w-full">
                <div className=" w-[95%] bg-white rounded p-2">
                    <SearchInput setGridLayout={setGridLayout} onSearch={setQuery} setSortDirectionProp={setDir} setSortColumnProp={setCol} />
                </div>
            </div>

            <div className="flex ml-10 mr-10 mt-10 gap-15">
                <aside className="w-64 flex-shrink-0">
                    <SideBar filtsOnClick={dropFilters} onClick={setOnlyRevision} categsOnChange={setCategories} key={`search-${resetKey}`}  />
                </aside>
                <div>
                    {data?.items.total?
                        <main className="flex-1">
                            <AdvertsList isGridLayout={gridLayout} items={data?.items} />
                            <div className={""}>
                                <AdvertsPagination current={currentPage} total={data?.items.total} onChange={setCurrentPage}/>
                            </div>
                        </main>
                        :
                        <div className={"flex flex-row gap-2"}>
                            <MehOutlined  style={{ fontSize: '20px' }} size={20} />
                            <h2 className={"font-medium text-lg"}>Ничего не нашлось</h2>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Adverts;
