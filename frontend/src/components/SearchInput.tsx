import { Input} from 'antd';
import {AppstoreOutlined, UnorderedListOutlined} from '@ant-design/icons'
import SortDropdown from "./SortDropdown.tsx";
import type {Dispatch, SetStateAction} from "react";

interface SearchInputProps{
    onSearch: Dispatch<SetStateAction<string>>;
    setSortDirectionProp: Dispatch<SetStateAction<"asc" | "desc" | undefined>>
    setSortColumnProp: Dispatch<SetStateAction<"title" | "createdAt" | undefined>>
    setGridLayout: (state: boolean)=>void;
}

const SearchInput = ({onSearch, setSortDirectionProp, setSortColumnProp, setGridLayout}:SearchInputProps) => {
    return (
        <div className={"flex flex-row gap-3 items-center"}>
            <Input.Search
                placeholder="Найти объявление..."
                variant="filled"
                className={"bg-gray-200 h-8 w-72"}
                onSearch={(e)=>onSearch(e)}
            />
            <div className={"flex flex-row justify-center gap-2"}>
                <div className="bg-gray-200 rounded p-1 flex items-center justify-center w-7 h-8">
                    <AppstoreOutlined onClick={()=>setGridLayout(true)} className="text-sm cursor-pointer" />
                </div>
                <div className="bg-gray-200 rounded p-1 flex items-center justify-center w-7 h-8">
                    <UnorderedListOutlined onClick={()=>setGridLayout(false)} className="text-sm cursor-pointer" />
                </div>
            </div>
            <SortDropdown setSortColumn={setSortColumnProp} setSortDirection={setSortDirectionProp}  />
        </div>
    );
};

export default SearchInput;