import React from 'react';
import CatBreedCard from '../../common/components/Cards/CatBreedCard';
import { CatBreed } from '../../models/cat-breed';
import CatBreedsService from '../../common/services/cat-breeds-service';
import Pets4meCatBreedsServiceContext from '../../common/services/pets4me-cat-breeds-service';
import InfoCards from '../../common/components/Cards/InfoCards';
import { ObjectsPage } from '../../models/ObjectsPage';

class CatBreedsInfoCards extends InfoCards<CatBreed> {
    static contextType = Pets4meCatBreedsServiceContext
    
    fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<CatBreed>> => {
        const pets4meDogBreedService: CatBreedsService = this.context
        return pets4meDogBreedService.getCatBreeds(pageNumber)
    }

    createInfoCard = (o: CatBreed, key: any): JSX.Element => {
        return <CatBreedCard key={`pet-card-${key}`} breed={o} />
    }

    getPathName = (): string =>  {
        return '/cat-breeds'
    }
}

export default CatBreedsInfoCards;
