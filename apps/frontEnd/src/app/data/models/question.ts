export class Question {
    _id: string;
    userId: string;
    title: string;
    category: string;
    body: string;
    tags: any[];
    views: number;
    votes: number;

    constructor() {
    }
}

