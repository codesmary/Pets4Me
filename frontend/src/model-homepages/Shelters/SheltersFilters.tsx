import React from 'react';
import Slider from '@material-ui/core/Slider'
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form'
import { SheltersFiltersData } from '../../models/SheltersFiltersData'
import { ThemeProvider } from '@material-ui/core';
import { sliderTheme, SelectItem, selectifyDataArray } from '../ModelHomepageUtils'
import '../ModelHomepage.css'

interface SheltersFiltersState {
    city: string[];
    postcode: number;
    state: string[];
    distanceMax: number;
    shelterWithSpecies: string[];
    sortType: string | undefined;
    sortDir: string | undefined;
}

const customStyles = {
    control: (base: any, state: { isFocused: any; }) => ({
        ...base,
        borderColor: state.isFocused ? "#D3D3D3" : "#D3D3D3",
        boxShadow: null,
        "&:hover": {
        borderColor: "none"
        }
    })
  };

export class SheltersFilters extends React.Component<SheltersFiltersData, SheltersFiltersState> {

    public sortData: SelectItem[] = [
        {label: "Name", value: "Name"},
        {label: "City", value: "City"},
        {label: "State", value: "State"},
        {label: "Distance", value: "Distance"}
    ]
    public cityData: SelectItem[] = [];
    public stateData: SelectItem[] = [];
    public speciesData = [
        { label: "Cat", value: "cats" },
        { label: "Dog", value: "dogs" }] as SelectItem[];

    constructor(props: SheltersFiltersData) {
        super(props);
        selectifyDataArray(this.props.cities, this.cityData);
        selectifyDataArray(this.props.states, this.stateData);
        this.state = {
            city: [],
            postcode: 0,
            state: [],
            distanceMax: 1000,
            shelterWithSpecies: [],
            sortType: undefined,
            sortDir: "desc"
        }
    }

    render() {
        return (
            <div className='filters'>
                <Select options={this.sortData} placeholder="Sort by..." isClearable={true}
                    onChange={(value: any) => this.setState({sortType: value?.value})}
                    styles={customStyles}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: '#966a7d',
                          primary: '#581730',
                          primary50: '#966a7d'
                        },
                    })}
                    />
                {/* React is tragically very stupid and this is the only way I could style it right*/}
                <div className="sort-button-group">
                    <ToggleButtonGroup type="radio" name="sortOrder" defaultValue={2}>
                        <ToggleButton value={1} onClick={(value: any) => this.setState({sortDir: "asc"})}>Ascending</ToggleButton>
                        <ToggleButton value={2} onClick={(value: any) => this.setState({sortDir: "desc"})}>Descending</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <Select isMulti options={this.cityData} placeholder="Select a city..." isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({city: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({city: []});
                        }}}
                        styles={customStyles}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                            ...theme.colors,
                            primary25: '#966a7d',
                            primary: '#581730',
                            primary50: '#966a7d',
                            dangerLight: '#966a7d',
                            danger: '#581730',
                            neutral10: '#966a7d',
                            neutral20: '#966a7d',
                            },
                        })}
                        />
                <Select isMulti options={this.stateData} placeholder="Select a state..." isClearable={true}
                    onChange={(newFilters: any) => {
                        if (newFilters) {
                            this.setState({state: newFilters.map((selectItem: SelectItem) => {
                                return selectItem.value;
                            })});
                        } else {
                            this.setState({state: []});
                        }}}
                        styles={customStyles}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                            ...theme.colors,
                            primary25: '#966a7d',
                            primary: '#581730',
                            primary50: '#966a7d',
                            dangerLight: '#966a7d',
                            danger: '#581730',
                            neutral10: '#966a7d',
                            neutral20: '#966a7d',
                            },
                        })}
                        />
                <Form className="postcode">
                    <Form.Group controlId="postcode">
                        <Form.Control type="number" placeholder="Enter a postcode..."
                            onInput={(value: any) => this.setState({postcode: value.target.value})} />
                    </Form.Group>
                </Form>
                <ThemeProvider theme={sliderTheme}>
                    <h5>Max distance from your postcode (mi.)</h5>
                    <Slider
                        defaultValue={0} max={this.props.max_distance} valueLabelDisplay='auto'
                        onChange={(event: any, value: any) => this.setState({distanceMax: value})}
                    />
                </ThemeProvider>
                <Select options={this.speciesData} placeholder="Select a species..." isClearable={true}
                    onChange={(value: any) => this.setState({shelterWithSpecies: value?.value})}
                    styles={customStyles}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                            ...theme.colors,
                            primary25: '#966a7d',
                            primary: '#581730',
                            primary50: '#966a7d',
                            dangerLight: '#966a7d',
                            danger: '#581730',
                            neutral10: '#966a7d',
                            neutral20: '#966a7d',
                            },
                        })}
                        />
                <Button variant='primary' onClick={() => console.log("current filters:: ", this.state)}>Submit</Button>
            </div>
        );
    }
} export default SheltersFilters;