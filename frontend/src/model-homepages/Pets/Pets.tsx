import React from 'react';
import PetsFilters from './PetsFilters';
import '../ModelHomepage.css';
import PetsInfoCards from './PetsInfoCards';
import Pets4meApiService from '../../common/services/Pets4meApiService'
import Spinner from "react-bootstrap/Spinner";
import { PetsFiltersData, petSampleFilterData } from '../../models/PetsFiltersData'
import { RouteComponentProps } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

interface PetsState {
  filterString: string,
  filterOptions: PetsFiltersData, 
  loading: boolean
}

export class Pets extends React.Component<RouteComponentProps, PetsState> {

  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      filterString: '',
      filterOptions: petSampleFilterData,
      loading: true
    }
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
  }

  public handleFilterUpdate(filters: string): void {
    this.setState({filterString: filters});
  }

  componentDidMount() {
    let apiService = new Pets4meApiService();
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    apiService.getFilterOptions()
        .then((response: any) => {
          let filtersData: PetsFiltersData = {
            ages: response.pets.ages,
            catBreeds: response.pets.cat_breeds,
            colors: response.pets.colors,
            dogBreeds: response.pets.dog_breeds,
            max_distance: response.pets.max_distance,
            sizes: response.pets.sizes,
            updateFilters: this.handleFilterUpdate
          }
          this.setState({filterOptions: filtersData, loading: false});
        })
        .catch(console.log)
  }

  render() {
    return (
      <div className='model-homepage' id='mainContent'>
        <Container fluid>
          <Row className="model-homepage-row">
            <Col bsPrefix="col-static col-fill">
              {this.state.loading ? <div className='filters'><Spinner animation='border'></Spinner></div> :
                <PetsFilters {...this.state.filterOptions}/> }
            </Col>
            <Col className='cards-container'  bsPrefix="col-custom-10 col-fill">
              <PetsInfoCards {...this.props} filterString={this.state.filterString} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
} export default Pets;
