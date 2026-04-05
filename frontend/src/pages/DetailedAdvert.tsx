import {Button, Card, Skeleton} from "antd";
import {EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {dateConverter} from "../services/date/dateConverter.ts"
import { Divider } from 'antd';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {validateItem} from "../services/items/validateItem.ts";
import {useGetAd} from "../hooks/useAds.ts";
import {getTranslate} from "../services/items/itemFieldsConfig.ts";

const DetailedAdvert = () => {

    const [showBanner, setShowBanner] = useState<boolean>(false);
    const [missing, setMissing] = useState<string[]>([]);
    const [itemParams, setItemParams] = useState<string[]>([]);


    const params = useParams()

    const id = params.id;

    const {data, isLoading, isError, error} = useGetAd(id);

    const item = data?.data;

    useEffect(() => {
        if (item && item.params && Object.keys(item.params).length > 0){
            setItemParams(Object.keys(item?.params))
            const valid = validateItem(item);
            if(!valid.res){
                setMissing(valid.missing);
                setShowBanner(true);
            }
        }
    }, [item]);

    if(isLoading) return <div className={"mt-10 ml-10 w-[90%]"}><Skeleton /></div>
    if(isError) return <div>Error: {error?.message}</div>

    return (
        <>
            <div className={"flex justify-between"}>
                <div className={"flex flex-col ml-5"}>
                    <h1 className={"mt-5 text-lg font-semibold"}>{item?.title}</h1>
                    <div className={"mt-2"}>
                        <Link to={`/ads/${id}/edit`}>
                            <Button type="primary" icon={<EditOutlined />}>Редактировать</Button>
                        </Link>
                    </div>
                </div>

                <div className={"flex flex-col text-right mr-5"}>
                    <h1 className={"font-semibold text-lg mt-5"}>{item?.price} ₽</h1>
                    <div className={"flex flex-col text-gray-500 mt-2"}>
                        <p>Опубликовано: {dateConverter(item?.createdAt)}</p>
                        <p>Отредактировано: {dateConverter(item?.createdAt)}</p>
                    </div>
                </div>
            </div>
            <Divider />
            <div className={"flex flex-row"}>
                <div className={"w-100 h-100 ml-5 mt-10"}>
                    <img
                        draggable={false}
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        className="w-full object-cover"
                    />
                    <h2 className={"text-xl font-semibold mt-5"}>Описание</h2>
                    <div className={"mt-2"}>
                        {item?.description?
                            <div className={" h-200 break-all wrap-normal"}>
                                <p>{item.description}</p>
                            </div>:
                            <h2 className={"font-medium text-md"}>Отсутствует</h2>
                        }
                    </div>
                </div>
                <div>
                    {showBanner &&
                        <div className={"mt-10 ml-10 flex flex-col gap-2"}>
                            <Card style={{ width: 300, background: "#FFE7BA"}}>
                                <div className={"flex flex-row gap-4"}>
                                    <ExclamationCircleOutlined />
                                    <p className={"font-semibold text-lg"}>Требуются доработки</p>
                                </div>
                                <div className={"ml-8 mt-2"}>
                                    <p className={"font-semibold text-md"}>Не заполнены поля: </p>
                                    <ul style={{listStyleType: "circle"}}>
                                        {missing.map((val, index) => (
                                            <li key={index}>{getTranslate({target:val})}</li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        </div>
                    }
                    <div className={"mt-10 ml-15"}>
                        <h2 className={"font-semibold text-xl"}>Характеристики</h2>
                        <div className={"flex flex-col mt-3 gap-2"}>
                            {itemParams && itemParams.length > 0 ? (
                                itemParams.map((key, index) => (
                                    <div key={index} className={"flex flex-row gap-10 justify-between pb-2"}>
                                        <p className={"font-medium text-gray-600"}>{getTranslate({target: key})}</p>
                                        <p className={"text-black"}>{getTranslate({param: key, value: item?.params[key]})}</p>
                                    </div>
                                        ))
                            ) : (
                                <p className={"text-gray-400"}>Нет характеристик</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
};

export default DetailedAdvert;