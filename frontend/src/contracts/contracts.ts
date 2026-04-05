// export type ItemsGetOut = {
//     // Массив объявлений
//     items: {
//         category: "auto" | "real_estate" | "electronics";
//         title: string;
//         price: number;
//         // Требуются ли доработки
//         needsRevision: boolean;
//     }[];
//     // Общее количество записей, подходящих под условия фильтрации
//     total: number;
// }
//
// export type ItemUpdateIn = {
//     category: 'auto' | 'real_estate' | 'electronics';
//     title: string;
//     description?: string;
//     price: number;
//     params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
// };
//
// export type AutoItemParams = {
//     brand?: string;
//     model?: string;
//     yearOfManufacture?: number;
//     transmission?: 'automatic' | 'manual';
//     mileage?: number;
//     enginePower?: number;
// };
//
// export type RealEstateItemParams = {
//     type?: 'flat' | 'house' | 'room';
//     address?: string;
//     area?: number;
//     floor?: number;
// };
//
// export type ElectronicsItemParams = {
//     type?: 'phone' | 'laptop' | 'misc';
//     brand?: string;
//     model?: string;
//     condition?: 'new' | 'used';
//     color?: string;
// };

export const autoAllFields = new Set([
    'title',
    'description',
    'price',
    'brand',
    'model',
    'yearOfManufacture',
    'transmission',
    'mileage',
    'enginePower'
]);

// Для real_estate
export const realEstateAllFields = new Set([
    'title',
    'description',
    'price',
    'type',
    'address',
    'area',
    'floor'
]);

// Для electronics
export const electronicsAllFields = new Set([
    'title',
    'description',
    'price',
    'type',
    'brand',
    'model',
    'condition',
    'color'
]);