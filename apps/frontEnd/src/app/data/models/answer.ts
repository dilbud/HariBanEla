export class Answer {
    // _id: string;
    id: string;
    userId: string;
    body: string;
    votes: number;
    comments: any[];
    createdAt: Date;
    isAccepted: boolean;

    constructor() {
    }
}
