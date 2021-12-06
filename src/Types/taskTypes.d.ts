export interface series {
  seriesNumber: number;
  tasks: taskMeta[];
}

export interface taskMeta {
  id: string;
  name: string;
  type: string;
  category: string[];
  difficulty: number;
  deadline: date;
  published: boolean;
  maxPoints: number;
  authors: string[];
  modules: number;
}

export interface commonModuleMeta {
  name: string;
  introText: string;
  type: string;
}

export interface textModuleMeta extends commonModuleMeta {
  questions: [
    {
      question: String;
      acceptedAnswers: [String];
      caseSensitive: boolean;
      doNotIgnoreWhitespaces: boolean;
      points: number;
    }
  ];
  variant: string;
}

export interface fileModuleMeta extends commonModuleMeta {
  points: number;
  acceptedFormats: string;
  maxFileSize: number;
  filesLimit: number;
}
