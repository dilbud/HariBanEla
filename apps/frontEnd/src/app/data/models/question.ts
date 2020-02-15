export class Question {
  
    // tslint:disable-next-line: variable-name
    _id: string;
    userId: string;
    title: string;
    category: string;
    body: string;
    tags: any[];
    answers: any[];
    comments: any[];
    createdAt: Date;
    views: number;
    votes: number;

    constructor() {
    }
}

