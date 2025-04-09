export interface MultipleChoiceQuestion {
    id : number;
    type: 1 | 2;
    question: string;
    options: string[];
    answer : string;
}

export interface TextQuestion {
    id : number;
    type: 3;
    question: string;
    answer : string;
}

export interface CodingQuestion {
    id : number;
    type : 4;
    topic : string;
    input : string;
    output : string;
    example : string[][];
    answer : string[][];
}

type questionInterface = MultipleChoiceQuestion | TextQuestion | CodingQuestion;
export default questionInterface;