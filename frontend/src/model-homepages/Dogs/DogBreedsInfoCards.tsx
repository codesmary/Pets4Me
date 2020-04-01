import React from 'react';
import { ObjectsPage } from '../../models/ObjectsPage';
import { DogBreedCard } from '../../common/components/Cards/DogBreedCard';
import { DogBreed } from '../../models/dog-breed';
import Pets4meDogBreedsServiceContext from '../../common/services/pets4me-dog-breeds-service';
import DogBreedsService from '../../common/services/dog-breeds-service';
import InfoCards from '../../common/components/Cards/InfoCards';

class DogBreedsInfoCards extends InfoCards<DogBreed> {
    static contextType = Pets4meDogBreedsServiceContext
    
    fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<DogBreed>> => {
        const pets4meDogBreedService: DogBreedsService = this.context
        return pets4meDogBreedService.getDogBreeds(pageNumber)
    }

    createInfoCard = (o: DogBreed, key: any): JSX.Element => {
        return <DogBreedCard key={`pet-card-${key}`} breed={o} />
    }

    getPathName = (): string =>  {
        return '/dog-breeds'
    }
}

export default DogBreedsInfoCards