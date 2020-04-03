import React from 'react';
import CatsFilters from './CatsFilters'
import '../ModelHomepage.css';
import CatBreedsInfoCards from './CatBreedsInfoCards';
import MediaQuery from 'react-responsive';

function CatBreeds() {
  return (
    <div className='model-homepage'>
      <MediaQuery query="(max-width: 949px)">
        <div className='model-homepage-content'>
          <form>
              <label>
                  <input type="text" name="global-search" placeholder='Search' />
              </label>
          </form>
          <CatsFilters />
          <CatBreedsInfoCards />
        </div>
      </MediaQuery>

      <MediaQuery query="(min-width: 950px)">
        <div className='model-homepage-content'>
          <CatsFilters />
          <div className='model-homepage-content-col'>
            <div className='sliders'>
              <form>
                <label>
                    <input type="text" name="global-search" placeholder='Search' />
                </label>
              </form>
            </div>
            <div className='cards-container'>
              <CatBreedsInfoCards />
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
} export default CatBreeds;
