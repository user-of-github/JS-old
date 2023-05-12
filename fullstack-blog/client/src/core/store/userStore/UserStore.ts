import { makeObservable } from 'mobx';

class UserStore {
    public constructor() {
        makeObservable(this, {

        });
    }
}

export default new UserStore();
