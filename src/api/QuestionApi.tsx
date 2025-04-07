interface MultipleChoiceQuestion {
    type: 1 | 2;
    question: string;
    options: [string, string, string, string];
}

interface TextQuestion {
    type: 3;
    question: string;
}

interface CodingQuestion {
    type : 4;
    topic : string,
    input : string,
    output : string,
    example : string[][]
}

type QuestionProp = MultipleChoiceQuestion | TextQuestion | CodingQuestion;
export default QuestionProp;