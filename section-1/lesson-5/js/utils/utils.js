export function watchObj(node, callback){
    let reactiveFunctions = {
        push: true,
        pop: true,
        splice: true,
        slice: true,
        shift: true,
        unshift: true
    };

    return new Proxy(node, {
        set(target, name, value){
            target[name] = value;
            callback(name, value);
            return true;
        },
        get(target, name){
            switch(typeof target[name]){
                case 'object':
                    return watchObj(target[name], callback);
                case 'function':
                    if(name in reactiveFunctions){
                        return function(...args){
                            let res = target[name].apply(target, args);
                            callback();
                            return res;
                        }
                    }
                    else{
                        return target[name].bind(target);
                    }
                default:
                    return target[name];
            }
        }
    });
}

export function convertDate(date) {
    return (new Date(date)).toLocaleString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });
}

export function convertTime(date) {
    return (new Date(date)).toLocaleString("ru-RU", {
      month: "numeric",
      day: "numeric"
    });
}