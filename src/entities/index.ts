export type ItemsGetOut = {
    items: {
        id: number;
        category: "auto" | "real_estate" | "electronics";
        title: string;
        price: number;
        needsRevision: boolean;
    }[];
    total: number;
}

export type Item = {
    id: number;
    category: "auto" | "real_estate" | "electronics";
    title: string;
    price: number;
    needsRevision: boolean;
}

export type ItemUpdateIn = {
    category: 'auto' | 'real_estate' | 'electronics';
    title: string;
    description?: string;
    price: number;
    createdAt: string;
    params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
    needsRevision: boolean;
};

export type AllItemParams = AutoItemParams | RealEstateItemParams | ElectronicsItemParams;

export type AutoItemParams = {
    brand?: string;
    model?: string;
    yearOfManufacture?: number;
    transmission?: 'automatic' | 'manual';
    mileage?: number;
    enginePower?: number;
};

export type RealEstateItemParams = {
    type?: 'flat' | 'house' | 'room';
    address?: string;
    area?: number;
    floor?: number;
};

export type ElectronicsItemParams = {
    type?: 'phone' | 'laptop' | 'misc';
    brand?: string;
    model?: string;
    condition?: 'new' | 'used';
    color?: string;
};

export type MainItemValues = {
    category: "auto" | "real_estate" | "electronics";
    title: string;
    price: number;
    description?: string;
}

export type RealEstateItemCreate = Omit<ItemUpdateIn, 'needsRevision' | 'createdAt' | 'params'> & RealEstateItemParams;

export type ElectronicsItemCreate = Omit<ItemUpdateIn, 'needsRevision' | 'createdAt' | 'params'> & ElectronicsItemParams;

export type AutoItemCreate = Omit<ItemUpdateIn, 'needsRevision' | 'createdAt' | 'params'> & AutoItemParams;
