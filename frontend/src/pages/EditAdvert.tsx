import {Input, Select, Divider, Button, Skeleton, Tooltip, Spin} from 'antd';
import {BulbOutlined, CheckOutlined, LoadingOutlined, RedoOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {useAskAI, useGetAd, useUpdateAd} from "../hooks/useAds.ts";
import {useEffect, useState} from "react";
import {fieldsConfig} from "../services/items/itemFieldsConfig.ts";
import {parseResponse} from "../services/ai/parseResponse.ts";

const EditAdvert = () => {
    const { TextArea } = Input;
    const navigate = useNavigate();

    const params = useParams();

    const {data, isLoading, isError, error} = useGetAd(params.id);

    const item = data?.data;

    const [category, setCategory] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<number | string>('');
    const [description, setDescription] = useState<string>('');

    const [paramsData, setParamsData] = useState<Record<string, any>>({});

    const [showPriceTooltip, setShowPriceTooltip] = useState<boolean>(false);
    const [showDescriptionTooltip, setShowDescriptionTooltip] = useState<boolean>(false);

    const closePriceTooltip = () => {
        setShowPriceTooltip(false);
        setAiTopic("");
    };

    const closeDescriptionTooltip = () => {
        setShowDescriptionTooltip(false);
        setAiTopic("");
    };

    const {mutate: updateAd, isPending: isUpdating} = useUpdateAd();

    useEffect(() => {
        if (item && item.params && Object.keys(item.params).length > 0){
            setParamsData(item.params || {});
            setCategory(item.category || '');
            setTitle(item.title || '');
            setPrice(item.price || '');
            setDescription(item.description || '');
        }
    }, [item]);

    const updateParam = (name: string, value: any) => {
        setParamsData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [aiTopic, setAiTopic] = useState<string>("");

    const { data: aiData, isFetching: aiFetching, isFetched: aiFetched, refetch, isError: aiError} = useAskAI(
        aiTopic || "",
        item
    );

    const handleAiPrice = () => {
        closePriceTooltip()
        const parsedPrice = parseResponse(aiData?.data.response);
        setPrice(parsedPrice)
    }

    const handleAiDescription = () => {
        closeDescriptionTooltip()
        setDescription(aiData?.data.response.slice(0, -1));
    }


    if(isLoading) return <div className={"mt-10 ml-10 w-[90%]"}><Skeleton /></div>
    if(isError) return <div>Error: {error?.message}</div>

    const currentFields = fieldsConfig[category as keyof typeof fieldsConfig] || [];

    const handleSave = () => {
        const updatedData = {
            category,
            title,
            price: Number(price),
            description,
            params: paramsData
        };
        updateAd({id: params.id, updatedData: updatedData},{
            onSuccess: ()=>{
                navigate(`/ads/${params.id}`)
            }
        })
    }
    const handleCancel = () => {
        navigate(`/ads/${params.id}`)
    }

    return (
        <div>
            <h2 className={"font-semibold text-xl mt-5 ml-5"}>Редактировать объявления</h2>
                <div className={"ml-5 mt-5 flex flex-col gap-3 w-[20%]"}>
                    <p className={"font-medium"}>Категория</p>
                    <Select
                        size={"middle"}
                        showSearch={{ optionFilterProp: 'label' }}
                        placeholder= {"Выберите категорию товара"}
                        options={[
                            { value: 'auto', label: 'Авто' },
                            { value: 'real_estate', label: 'Недвижимость' },
                            { value: 'electronics', label: 'Электроника' },
                        ]}
                        defaultValue={item?.category}
                    />
                </div>
            <Divider />
            <div className={"w-full"}>
                <div className={"flex flex-col gap-3 w-[20%] ml-5 mt-5"}>
                    <div className={"flex flex-row gap-2 items-center"}>
                        <label className={"text-red-500 "}>*</label>
                        <p className={"font-medium"}>Название</p>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <Input style={!title ? { border: '1px solid red', borderRadius: '9px' } : {}} size={"middle"} onChange={(e)=>setTitle(e.target.value)} value={title} placeholder={"Название товара"} allowClear={true}/>
                        {!title &&
                            <p className={"text-red-500 text-xs"}>Название должно быть заполнено</p>
                        }
                    </div>
                </div>
            </div>
            <Divider />
            <div className={"w-full"}>
                <div className={"flex flex-col gap-3 ml-5 mt-5"}>
                    <div className={"flex flex-row gap-2 items-center"}>
                        <label className={"text-red-500"}>*</label>
                        <p className={"font-medium"}>Цена</p>
                    </div>
                    <div className={"flex flex-row gap-5"}>
                        <div className={"flex flex-col gap-2"}>
                            <Input style={!price ? { border: '1px solid red', borderRadius: '9px' } : {}} size={"middle"} onChange={(e)=>setPrice(e.target.value)} value={price} placeholder={"Цена товара"} allowClear={true}/>
                            {!price &&
                                <p className={"text-red-500 text-xs"}>Цена должна быть заполнено</p>
                            }
                        </div>
                            <Tooltip open={showPriceTooltip} onOpenChange={setShowPriceTooltip} trigger={"click"} arrow={false} title={
                                <div className={"w-full"}>
                                    {aiError && (
                                        <div className={"w-full flex flex-col p-3 gap-2"}>
                                            <p className={"font-bold text-red-400"}>Произошла ошибка при запросе к AI</p>
                                            <p className="text-sm">Попробуйте повторить запрос или закройте уведомление</p>
                                            <Button onClick={()=>closePriceTooltip()} className={"mt-2"} size={"small"} color={"danger"} variant="solid">
                                                Закрыть
                                            </Button>
                                        </div>
                                    )}

                                    {!aiError && aiFetching && (
                                        <div className={"flex flex-row gap-5 p-3"}>
                                            <Spin indicator={<LoadingOutlined spin />} size="medium" />
                                            <h2 className={"font-semibold text-md"}>Дайте подумать...</h2>
                                        </div>
                                    )}

                                    {!aiError && !aiFetching && aiData && (
                                        <div className="p-3">
                                            <h2 className={"text-md font-semibold"}>Ответ AI</h2>
                                            <p className={"mt-3"}>
                                                <CheckOutlined className={"mr-2"} />
                                                {aiData?.data?.response}
                                            </p>
                                            <div className={"flex flex-row gap-3 mt-5 mb-2"}>
                                                <Button onClick={()=>handleAiPrice()} size={"small"} type="primary">
                                                    Применить
                                                </Button>
                                                <Button size={"small"} onClick={() => closePriceTooltip()}>
                                                    Закрыть
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }>
                                {aiTopic && aiTopic==="price"&& aiFetched?
                                    <Button onClick={()=>refetch()} className={"w-[12%]"} color="orange" variant="filled" icon={<RedoOutlined />}>
                                        Повторить запрос
                                    </Button>
                                    :
                                    <Button onClick={()=>setAiTopic("price")} className={"w-[12%]"} color="orange" variant="filled" icon={<BulbOutlined />}>
                                        Узнать рыночную цену
                                    </Button>
                                }
                            </Tooltip>
                    </div>
                </div>
            </div>
            <Divider />
            {category && currentFields.length > 0 && (
                <div className={"w-full"}>
                    <div className={"flex flex-col gap-3 w-[20%] ml-5 mt-5"}>
                        <p className={"font-medium"}>Характеристики</p>
                    </div>

                    {currentFields.map((field) => (
                        <div key={field.name} className={"flex flex-col gap-3 w-[20%] ml-5 mt-5"}>
                            <p className={"text-sm"}>{field.label}</p>
                            {field.type === 'select' ? (
                                <Select
                                    size={"middle"}
                                    value={paramsData[field.name]}
                                    onChange={(value) => updateParam(field.name, value)}
                                    placeholder={`Выберите ${field.label.toLowerCase()}`}
                                    options={field.options}
                                />
                            ) : (
                                <Input
                                    size={"middle"}
                                    value={paramsData[field.name] || ''}
                                    onChange={(e) => updateParam(field.name, e.target.value)}
                                    placeholder={field.label}
                                    allowClear={true}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
            <Divider />
            <div className={"w-[50%] ml-5 mt-5 font-semibold flex flex-col gap-3 "}>
                <p>Описание</p>
                <TextArea value={description} onChange={(e)=>setDescription(e.target.value)} showCount maxLength={100} placeholder="Описание товара" />
                <Tooltip open={showDescriptionTooltip} onOpenChange={setShowDescriptionTooltip} trigger={"click"} arrow={false} title={
                    <div className={"w-full"}>
                        {aiError && (
                            <div className={"w-full flex flex-col p-3 gap-2"}>
                                <p className={"font-bold text-red-400"}>Произошла ошибка при запросе к AI</p>
                                <p className="text-sm">Попробуйте повторить запрос или закройте уведомление</p>
                                <Button onClick={()=>closeDescriptionTooltip()} className={"mt-2"} size={"small"} color={"danger"} variant="solid">
                                    Закрыть
                                </Button>
                            </div>
                        )}

                        {!aiError && aiFetching && (
                            <div className={"flex flex-row gap-5 p-3"}>
                                <Spin indicator={<LoadingOutlined spin />} size="medium" />
                                <h2 className={"font-semibold text-md"}>Дайте подумать...</h2>
                            </div>
                        )}

                        {!aiError && !aiFetching && aiData && (
                            <div className="p-3">
                                <h2 className={"text-md font-semibold"}>Ответ AI</h2>
                                <p className={"mt-3"}>
                                    <CheckOutlined className={"mr-2"} />
                                    {aiData?.data?.response}
                                </p>
                                <div className={"flex flex-row gap-3 mt-5 mb-2"}>
                                    <Button onClick={()=>handleAiDescription()} size={"small"} type="primary">
                                        Применить
                                    </Button>
                                    <Button size={"small"} onClick={() => closeDescriptionTooltip()}>
                                        Закрыть
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                }>
                    {aiTopic && aiTopic==="description"&& aiFetched?
                        <Button onClick={()=>refetch()} className={"w-[25%]"} color="orange" variant="filled" icon={<RedoOutlined />}>
                            Повторить запрос
                        </Button>
                        :
                        <Button onClick={()=>setAiTopic("description")} className={"w-[25%]"} color="orange" variant="filled" icon={<BulbOutlined />}>
                            {item.description?"Улучшить описание":"Придумать описание"}
                        </Button>
                    }
                </Tooltip>
            </div>
            <div className={"flex flex-row mt-5 mb-10 ml-5 gap-3"}>
                <Button loading={isUpdating} onClick={handleSave} type="primary" size={"large"}>
                    Сохранить
                </Button>
                <Button onClick={handleCancel} color="default" variant="filled" size={"large"}>
                    Отменить
                </Button>
            </div>
        </div>
    );
};

export default EditAdvert;