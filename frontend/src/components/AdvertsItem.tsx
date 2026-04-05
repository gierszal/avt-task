
import { Card } from 'antd';
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {getTranslate} from "../services/items/itemFieldsConfig.ts";

interface AdvertsItemProps {
    item: any;
    isGridLayout: boolean
}

const AdvertsItem = ({ item, isGridLayout }: AdvertsItemProps) => {
    return (
        <div className={"w-full"}>
            {isGridLayout
                ?
                <Card
                    style={{ width: 200, height: 320 }}
                    bodyStyle={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}
                    className="flex flex-col overflow-hidden"
                    cover={
                        <img
                            draggable={false}
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            className="h-32 w-full object-cover"
                        />
                    }
                    title={
                        <div className="flex justify-center">
                            <div className="text-center border-2 border-gray-400 rounded-lg px-2 py-0.5 text-xs">
                                {getTranslate({param: "category", value: item.category})}
                            </div>
                        </div>
                    }
                >
                    <div className="flex flex-col flex-1">
                        <div className="font-medium text-sm break-words line-clamp-3 flex-1">
                            {item.title}
                        </div>
                        <div className="text-base font-bold text-gray-400 mt-2">
                            {item.price} ₽
                        </div>
                        {item.needsRevision&&
                            <div className={"inline-flex mt-2 items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFE7BA] border border-orange-200"}>
                                <ExclamationCircleOutlined className={"text-orange-400 text-xs"} />
                                <p className={"text-orange-400 text-xs m-0"}>Требует доработок</p>
                            </div>
                        }
                    </div>
                </Card>
                :
                <Card
                    style={{width: "246%"}}
                    styles={{body: {padding: '12px'}}}
                    className="overflow-hidden"
                >
                    <div className="flex flex-row gap-4 h-full">
                        <img
                            draggable={false}
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            className="w-50 h-full object-cover rounded"
                        />

                        <div className="flex flex-col flex-1 justify-between">
                            <div>
                                <div className="inline-block border-2 border-gray-400 rounded-lg px-2 py-0.5 text-xs mb-2">
                                    {getTranslate({param: "category", value: item.category})}
                                </div>
                                <div className="font-medium text-sm break-words line-clamp-2">
                                    {item.title}
                                </div>
                            </div>

                            <div>
                                <div className="text-base font-bold text-gray-400">
                                    {item.price} ₽
                                </div>
                                {item.needsRevision && (
                                    <div className="inline-flex mt-2 items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFE7BA] border border-orange-200">
                                        <ExclamationCircleOutlined className="text-orange-400 text-xs" />
                                        <p className="text-orange-400 text-xs m-0">Требует доработок</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            }
        </div>

    );
};

export default AdvertsItem;