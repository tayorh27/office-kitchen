import * as firebase from 'firebase';
var RouteGuard = /** @class */ (function () {
    function RouteGuard() {
    }
    RouteGuard.prototype.canActivate = function () {
        if (firebase.auth().currentUser) {
            return true;
        }
        else {
            return false;
        }
    };
    return RouteGuard;
}());
export { RouteGuard };
//# sourceMappingURL=app-route-guard.js.map