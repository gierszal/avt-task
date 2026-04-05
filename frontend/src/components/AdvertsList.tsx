import AdvertsItem from "./AdvertsItem.tsx";
import {Link} from "react-router-dom";


interface AdvertsListProps {
    items: any;
    isGridLayout: boolean
}

const AdvertsList = ({items, isGridLayout}:AdvertsListProps ) => {
    return (
        <div className={`flex flex-wrap flex-${isGridLayout?"row":"col"} gap-15`}>
                {
                    items.items.map((item:any, index:number)=>(
                        <Link to={`/ads/${index+1}`} className={"cursor-pointer"} key={index}>
                            <AdvertsItem isGridLayout={isGridLayout} item={item} key={index}/>
                        </Link>
                    ))
                }
        </div>
    );
};

export default AdvertsList;