import { Person } from "@core/models/person";

export namespace PersonActions {
  export class FetchAll {
    static readonly type = '[Persons] fetch persons list';
    constructor() {}
  }

  export class CreatePerson{
    static readonly type = '[Persons] create a new person';
    constructor(public payload: Person) {}
  }

  export class DoFilterByName {
    static readonly type = '[Persons] Filters the values of the current state by "name"';
    constructor(public nameForFilterValues: string) {}
  }
}
