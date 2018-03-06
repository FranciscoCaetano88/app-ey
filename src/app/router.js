/**
 * Router Module
 */
class Router {

    constructor() {

        this.routes = [];

        this.defaultRoute = 'list';
        this.currentHash = ''; // required to track hash changes

    }

    /**
     * Start the routing process
     */
    start = function() {
        setToDefault();
        startUrlListener();
        startController();
    }

    add = function(routeName, cb) {
        this.routes.push({
            name: routeName,
            cb: cb
        });
    };

    remove = function(routeName) {
        this.routes = routes.filter(function(element) {
            return element.name !== routeName;
        });
    };

    destroy = function() {
        this.routes = [];
        clearInterval(this.listener);
    };

    // ::: Internals :::
    setToDefault() {
        this.currentHash = this.defaultRoute;
        window.location.hash = this.defaultRoute;
    }

    startUrlListener() {
        this.listener = setInterval(function() {
            if (this.currentHash !== window.location.hash.replace('#', '')) {
                this.currentHash = window.location.hash.replace('#', '');
                startController();
            }
        }, 100);
    }

    startController() {
        this.routes.forEach(function(controller) {
            if (controller.name === this.currentHash) {
                controller.cb();
            }
        });
    }

}

export { start, add, remove, destroy };
