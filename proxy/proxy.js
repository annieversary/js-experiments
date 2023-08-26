function wrapper(array) {
    const m = {
        __values: array,
        __functions: {
            get() {
                return this.__values;
            },
        }
    };

    return new Proxy(m, {
        get(target, prop) {
            if (prop in target.__functions) {
                return target.__functions[prop].bind(target);
            }

            if (prop == 'apply') {
                return new Proxy(target, {
                    get(target2, prop2) {
                        return function (f) {
                            for (const e of target2.__values) {
                                e[prop2] = f(e[prop2]);
                            }
                        };
                    }
                });
            }

            if (target.__values.length > 0 && typeof target.__values[0][prop] == 'function') {
                return function () {
                    for (const e of target.__values) {
                        e[prop](...arguments);
                    }
                };
            }

            return wrapper(target.__values.map(e => e[prop]));
        },
        set(target, prop, value) {
            for (const e of target.__values) {
                e[prop] = value;
            }
        },
    });
}

function m(query) {
    const res = document.querySelectorAll(query);
    return wrapper([...res]);
}

