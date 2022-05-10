import Person from "./Person";

interface People {

    count:number,
    next:string,
    previous:string|null,
    results:Person[]

}

export default People