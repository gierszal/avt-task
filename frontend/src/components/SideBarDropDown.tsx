import { Flex, Select } from 'antd';

interface SideBarDropDownProps{
    onChange: (categs: string[]) => void;
}

const SideBarDropDown = ({onChange}:SideBarDropDownProps) => (
    <Flex gap={12} vertical>
        <Flex gap={8}>
            <Select
                mode="multiple"
                placeholder="Категории"
                style={{ flex: 1 }}
                onChange={(e) => onChange(e)}
                options={[
                    { value: 'auto', label: 'Авто' },
                    { value: 'real_estate', label: 'Недвижимость' },
                    { value: 'electronics', label: 'Электроника' },
                ]}
            />
        </Flex>
    </Flex>
);

export default SideBarDropDown;