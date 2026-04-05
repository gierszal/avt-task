import {excludedFields} from "./itemFieldsConfig.ts";
import {autoAllFields, electronicsAllFields, realEstateAllFields} from "../../contracts/contracts.ts";

export const validateItem = (item: any, parentKey: string = '') => {
    const properties: Set<string> = new Set();
    const missing:string[] = [];
    let parentSet: Set<string> = new Set();

    switch (item.category) {
        case "auto":
            parentSet = autoAllFields;
            break;
        case "real_estate":
            parentSet = realEstateAllFields;
            break;
        case "electronics":
            parentSet = electronicsAllFields;
            break;
    }

    const validate = (obj: any, path: string) => {
        for (const key in obj) {
            const currentPath = path ? `${path}.${key}` : key;
            properties.add(key)
            if (obj[key] && typeof obj[key] === 'object') {
                validate(obj[key], currentPath);
            } else {
                if (!obj[key] && !excludedFields.includes(key)) {
                    missing.push(currentPath);
                }
            }
        }
    };

    validate(item, parentKey);

    const missingFields = Array.from(parentSet).filter(field => !properties.has(field));
    missingFields.push(...missing);

    return {
        res: missingFields.length===0,
        missing: missingFields,
        properties: Array.from(properties)
    };
};