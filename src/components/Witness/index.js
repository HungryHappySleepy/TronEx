import React, { Component } from 'react';
import './style.css';
import {DropdownButton, MenuItem, Row, Col} from 'react-bootstrap';

import Service from './../utils/service.js';

class Witness extends Component {
    constructor(props){
        super(props);

        this.state = {
            witnesses:[],   
            dropdown:"Select An Item",
            searchbar:""
        }

        this.getWitnesses("witnesses","","");

        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleSearchEvent = this.handleSearchEvent.bind(this);
    }

    handleDropDownChange(e){
        this.setState({
            dropdown: e
        });
    }

    handleSearchBarChange(event){
        this.setState({
            searchbar: event.target.value
        });
    }

    handleSearchEvent(event){
        this.getWitnesses("witnesses", this.state.searchbar, this.state.dropdown);
    }

    render() {
        return (
            <div className="Witness">
                <Row className="padding">
                        <Col xs={12} md={8} >
                            <div className="leftAlign">
                                <DropdownButton
                                        title={this.state.dropdown}
                                        key={"asd"}
                                        id={"type"}
                                        bsStyle="btn-light"
                                        onChange={this.handleDropDownChange}>
                                    <MenuItem eventKey="address" onSelect={this.handleDropDownChange}>Address</MenuItem>
                                    <MenuItem eventKey="voteCount" onSelect={this.handleDropDownChange}>Vote Count</MenuItem>
                                    <MenuItem eventKey="url" onSelect={this.handleDropDownChange}>Site Name</MenuItem>
                                    <MenuItem eventKey="totalmissed" onSelect={this.handleDropDownChange}>Total Missed</MenuItem>
                                    <MenuItem eventKey="latestBlockNum" onSelect={this.handleDropDownChange}>Latest Block Number</MenuItem>
                                    <MenuItem eventKey="latestSlotNum" onSelect={this.handleDropDownChange}>Latest Slot Number</MenuItem>
                                    {/*<MenuItem divider />
                                    <MenuItem eventKey="4">Separated link</MenuItem>*/}
                                </DropdownButton>
                            </div>
                        
                            <div className="paddingLeft">
                                <input 
                                    type="input"
                                    className="searchBar"
                                    placeholder="Enter Search Term.... "
                                    onChange={this.handleSearchBarChange}
                                />
                            </div>
                        </Col>
                    
                        <Col xs={6} md={4}>
                            <input 
                                type="submit"
                                value="Search"
                                className="btn btn-light rightAlign"
                                placeholder=""
                                onClick={this.handleSearchEvent}
                            />
                         </Col>

                            {/*<div class="rightAlignText" id="searchResults">Results: {this.state.witnesses.length}</div>*/}
                </Row>
                <div className="padding">
                    <WitnessTable witnesses={this.state.witnesses}/>
                </div>
            </div>

        );
    }

    getWitnesses(type, filter, field){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity(type, filter, field);
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise);
        });
    }

    _displayResponse(response){
        this.setState({
            witnesses:response.hits.hits
        });

        console.log(this.state.witnesses)

        /*output += "<td>pubKey: " + witness._source.pubkey + '</td>';*/
        /*output += "<td>isJobs: " + witness._source.isjobs + '</td>';*/
    }
}

class WitnessTable extends React.Component {
    render(){
        return(
            <table id="witnessTable padding">
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Address</th>
                        <th>Vote Count</th>
                        <th>Site Name</th>
                        <th>Total Missed</th>
                        <th>Latest Block</th>
                        <th>Latest Slot</th>
                    </tr>
                    {
                        this.props.witnesses.map((witness, index) => { 
                            var output = 
                            <tr key={index}>
                                <td >{index}</td>
                                <td className="tableRowHeight">{witness._source.address}</td>
                                <td>{witness._source.voteCount}</td>
                                <td><a href="{witness._source.url}">{witness._source.url}</a></td>
                                <td>{witness._source.totalMissed}</td>
                                <td>{witness._source.latestBlockNum}</td>
                                <td>{witness._source.latestsLotNum}</td>
                            </tr>
                            return output;
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default Witness;