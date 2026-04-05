import {type Dispatch, type SetStateAction, useState} from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, type MenuProps } from 'antd';

const sortVariants = {
    'По новизне (сначала новые)': ["createdAt", "asc"],
    'По новизне (сначала старые)': ["createdAt", "desc"],
    'По названию (по порядку)': ['title', "asc"],
    "По названию (в обратном порядке)": ["title", "desc"],
}

type SortVariantKey = keyof typeof sortVariants;
type SortColumn = "title" | "createdAt";
type SortDirection = "asc" | "desc";

interface SortDropDown {
    setSortDirection: Dispatch<SetStateAction<SortDirection | undefined>>
    setSortColumn: Dispatch<SetStateAction<SortColumn | undefined>>
}

interface SortDropDown{
    setSortDirection: Dispatch<SetStateAction<"asc" | "desc" | undefined>>
    setSortColumn: Dispatch<SetStateAction<"title" | "createdAt" | undefined>>
}

const SortDropdown = ({setSortDirection, setSortColumn}:SortDropDown) => {

    const [variant, setVariant] = useState<SortVariantKey>(Object.keys(sortVariants)[0] as SortVariantKey);

    const onClick = (variant: SortVariantKey) => {
        setVariant(variant);
        const [column, direction] = sortVariants[variant];

        setSortColumn(column as SortColumn);
        setSortDirection(direction as SortDirection);
    }

    const items: MenuProps['items'] = [
        {
            key: 0,
            label: (
                <a>
                    {Object.keys(sortVariants)[0]}
                </a>
            ),
            onClick: () => onClick(Object.keys(sortVariants)[0] as SortVariantKey)
        },
        {
            key: 1,
            label: (
                <a>
                    {Object.keys(sortVariants)[1]}
                </a>
            ),
            onClick: () => onClick(Object.keys(sortVariants)[1] as SortVariantKey)
        },
        {
            key: 2,
            label: (
                <a>
                    {Object.keys(sortVariants)[2]}
                </a>
            ),
            onClick: () => onClick(Object.keys(sortVariants)[2] as SortVariantKey)
        },
        {
            key: 3,
            label: (
                <a>
                    {Object.keys(sortVariants)[3]}
                </a>
            ),
            onClick: () => onClick(Object.keys(sortVariants)[3] as SortVariantKey)
        },
    ];

    return(
        <div className={"cursor-pointer"}>
            <Dropdown menu={{items}}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <p className={"text-xs whitespace-nowrap"}>{variant}</p>
                        <DownOutlined/>
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
};

export default SortDropdown;