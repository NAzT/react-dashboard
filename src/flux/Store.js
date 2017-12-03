import { Store } from 'flux/utils';
import AppDispatcher from './Dispatcher';
import AppConstants from './Constants';

let menu = {
    masterMenuItems: [{
        'url': '/',
        'name': 'CMMC',
        'icon': 'fa fa-pie-chart',
        children: []
    }],
    nodeMenuItems: [{
        'id': 1,
        'url': '/environment',
        'name': 'สภาพแวดล้อม',
        'icon': 'fa fa-envira',
        'children': []
    }, {
        'id': 2,
        'url': '/battery',
        'name': 'แบตเตอรี่',
        'icon': 'fa fa-battery-three-quarters',
        'children': []
    }]
};

class MyStore extends Store {

    constructor (props) {
        super(props);
        this.menu = menu;
        this.menu.master = this.menu.masterMenuItems;
        this.menu.nodes = this.menu.nodeMenuItems;
        this.state = [];
        this.SENSOR_NODES = {};
    }

    __onDispatch (action) {
        if (action.type === AppConstants.DONE_GET_DATA) {
            Object.assign(this.menu, action.data);
            this.__emitChange();
        }
        else if (action.type === AppConstants.DONE_GET_MENU) {
            console.log('done get menu');
            Object.assign(this.menu, action.data);
            this.__emitChange();
        }
        else if (action.type === AppConstants.SENSOR_NODE_COMING) {
            this.SENSOR_NODES[action.data.name] = action.data.value;
            console.log('incomming data ... ', this.SENSOR_NODES);
        }
    }

}

export default new MyStore(AppDispatcher);
