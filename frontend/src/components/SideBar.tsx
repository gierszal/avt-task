import SideBarDropDown from "./SideBarDropDown.tsx";
import {Button, Divider} from 'antd';
import { Switch } from 'antd';

interface SideBarProps{
    onClick: (onlyRevision: boolean)=>void;
    categsOnChange: (categs: string[]) => void;
    filtsOnClick: () => void;
}


const SideBar = ({onClick, categsOnChange, filtsOnClick}:SideBarProps) => {

    return (
        <>
            <div className={"bg-white w-70 h-60 rounded-lg"}>
                <div className={"flex flex-col p-4 gap-1"}>
                    <h2 className={"font-semibold"}>Фильтры</h2>
                    <p className={"text-sm mb-1"}>Категория</p>
                    <SideBarDropDown onChange={categsOnChange} />
                    <Divider/>
                    <div className={"flex flex-row gap-5 justify-center items-center"}>
                        <h2>Только требующие доработок</h2>
                        <Switch onClick={(e)=> onClick(e)}/>
                    </div>
                </div>
            </div>

            <div className={"bg-white flex justify-center mt-3 w-70 h-10 rounded-lg"}>
                <div className={"flex items-center w-full"}>
                    <Button onClick={filtsOnClick} className={"w-full"} style={{height:"100%", color:"gray", fontSize:15}} variant="solid">
                        Сбросить фильтры
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SideBar;