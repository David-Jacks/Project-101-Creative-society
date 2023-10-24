import { lazy } from "react";

export function lazyLoad(path, namedExport){
    return lazy(()=>{
        const promise = import(path);
        if (namedExport === null){
            return promise
        } else {
            return promise.then(module =>({default: module[namedExport]}))
        }
    });
}


// we do this to be able to use react lazy globaly without having to import it and write allot of other codes
// lazyLoad("./components/About", "About");///first argument is the path and the second is the name you gave to your 
//function you want to import... if your happen to export your function by default exports, then you dont have to worry about the second args