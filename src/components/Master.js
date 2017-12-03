import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu.js';
import MasterGauge from './MasterGauge.jsx';
import store from '../flux/Store';
import _ from 'underscore';

export default class Master extends Component {

    constructor (props) {
        super(props);

        this.state = {
            nodes: [],
            loading: true,
            status: {}
        };

        console.log('===== master', store.state);
        store.addListener(() => {
            console.log('===== componentWillMount', store.state);
            this._processStore();
        });

        if (store.state.length !== 0) {
            this._processStore();
        }
    }

    _processStore = () => {
        const currentPath = this.props.location.pathname;
        let master = _.find(store.menu.master, (menu) => menu.url === currentPath);
        this.setState({
            status: master.data,
            loading: false
        });
    };

    componentWillMount () {

    }

    componentDidUpdate () {
        if (!this.state.loading) {
            ReactDOM.render(<MasterGauge data={this.state.status}/>, document.getElementById('masterGauge'));
        }
    }

    componentDidMount () {
        //console.log('=== componentDidMount >>> Master')
        if (!this.state.loading) {
            ReactDOM.render(<MasterGauge data={this.state.status}/>, document.getElementById('masterGauge'));
        }
    }

    render () {

        return (
          <div className='container'>
              <div className='section'>

                  <div className='columns'>
                      <div className="column is-3">
                          <Menu url={this.props.location.pathname}/>
                      </div>
                      <div className="column is-9 has-text-centered">

                          <div className={this.state.loading ? 'card' : ''}>
                              <div className={this.state.loading ? 'card-content' : ''}>
                                  <span className={this.state.loading && 'fa fa-refresh fa-spin fa-3x' || ''}/>
                              </div>
                          </div>

                          <div className={!this.state.loading ? 'card' : ''}>
                              <div className={!this.state.loading ? 'card-header' : ''}>
                                  <p className='card-header-title'
                                     style={{color: '#4468b0'}}>{!this.state.loading && 'Status'}</p>
                              </div>
                              <div className={!this.state.loading ? 'card-content' : ''}>
                                  <div id='masterGauge' className={!this.state.loading ? 'columns' : ''}
                                       style={{width: '100%'}}/>
                              </div>
                          </div>

                      </div>
                  </div>

              </div>
          </div>
        );

    }
}