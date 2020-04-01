export interface CatBreed {
    id: number;
    name: string;
    alt_names: string[];
    temperament: string;
    life_span: LifeSpan;
    indoor: number;
    dog_friendly: number;
    child_friendly: number;
    grooming_level: number;
    photo: string;
    cat_ids: any[];
    local_shelters_with_breed: any[];
}

export interface LifeSpan {
    high: number;
    low: number;
}
