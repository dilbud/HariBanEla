export class Question {
    _id: string;
    // owner: User;
    title: string;
    category: string;
    body: string;
    tags: any[];
    views: number;
    votes: number;

    constructor() {
    }
}

