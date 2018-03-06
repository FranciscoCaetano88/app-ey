import Router from './router';
import Service from './service/service'
    
import ListController from 'controllers/list-controller';
import DetailsController from 'controllers/details-controller';

window.onload = function() {

    const router = new Router();
    const service = new Service();

    const listCtrl = new ListController(service);
    const detailsCtrl = new DetailsController(service);

    // add controllers to the router
    router.add('list', function() {
        listCtrl.start();
    });

    router.add('details', function() {
        detailsCtrl.start();
    });

    router.start();

};
