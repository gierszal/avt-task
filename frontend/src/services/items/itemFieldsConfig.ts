
export const excludedFields:string[] = ["id", "createdAt", "updatedAd", "needsRevision"];

export const paramsTranslations: Record<string, string> = {
    "yearOfManufacture": "Год выпуска",
    "transmission": "Коробка передач",
    "mileage": "Пробег",
    "enginePower": "Мощность двигателя",
    "address": "Адрес",
    "area": "Площадь",
    "floor": "Этаж",
    "type": "Тип товара",
    "brand": "Бренд",
    "model": "Модель",
    "condition": "Состояние",
    "color": "Цвет",
    "description":"Описание",
};

export const valueTranslations: Record<string, Record<string, string>> = {
    category: {
        "auto": "Автомобили",
        "real_estate": "Недвижимость",
        "electronics": "Электроника"
    },
    type: {
        "flat": "Квартира",
        "house": "Дом",
        "room": "Комната",
        "phone": "Телефон",
        "misc": "Разное"
    },
    transmission: {
        "automatic": "Автоматическая"
    },
    condition: {
        "new": "Новый",
        "used": "Б/У"
    }
};

interface getTranslateFunc{
    target?:string,
    param?: string
    value?:string
}

export const getTranslate = ({target ="", param="", value=""}:getTranslateFunc): string => {
    if(param && param in valueTranslations){
        return valueTranslations[param][value] || value;
    }else if(param) return value;
    return paramsTranslations[target] || target;
};

export const fieldsConfig: Record<string, Array<{ name: string; label: string; type: 'input' | 'select'; options?: Array<{ value: string; label: string }> }>> = {
    auto: [
        { name: 'brand', label: 'Бренд', type: 'input' },
        { name: 'model', label: 'Модель', type: 'input' },
        { name: 'yearOfManufacture', label: 'Год выпуска', type: 'input' },
        { name: 'transmission', label: 'Коробка передач', type: 'select', options: [
                { value: 'automatic', label: 'Автоматическая' },
                { value: 'manual', label: 'Механическая' }
            ]},
        { name: 'mileage', label: 'Пробег (км)', type: 'input' },
        { name: 'enginePower', label: 'Мощность (л.с.)', type: 'input' }
    ],
    real_estate: [
        { name: 'type', label: 'Тип недвижимости', type: 'select', options: [
                { value: 'flat', label: 'Квартира' },
                { value: 'house', label: 'Дом' },
                { value: 'room', label: 'Комната' }
            ]},
        { name: 'address', label: 'Адрес', type: 'input' },
        { name: 'area', label: 'Площадь (м²)', type: 'input' },
        { name: 'floor', label: 'Этаж', type: 'input' }
    ],
    electronics: [
        { name: 'type', label: 'Тип устройства', type: 'select', options: [
                { value: 'phone', label: 'Телефон' },
                { value: 'misc', label: 'Разное' }
            ]},
        { name: 'brand', label: 'Бренд', type: 'input' },
        { name: 'model', label: 'Модель', type: 'input' },
        { name: 'condition', label: 'Состояние', type: 'select', options: [
                { value: 'new', label: 'Новый' },
                { value: 'used', label: 'Б/У' }
            ]},
        { name: 'color', label: 'Цвет', type: 'input' }
    ]
};