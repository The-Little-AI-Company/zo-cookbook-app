export type App = {
  id: number;
  name: string;
  category: string;
  description: string;
  howToBuild: string;
  monetization: string;
  difficulty: string;
};

export type Space = {
  id: number;
  name: string;
  route: string;
  type: string;
  visibility: "public" | "private";
  description: string;
  keyTech: string;
};

export type Automation = {
  id: number;
  name: string;
  category: string;
  schedule: string;
  delivery: string;
  tools: string;
  prompt: string;
  expectedOutput: string;
  customization: string;
};

export type Prompt = {
  id: number;
  name: string;
  category: string;
  whenToUse: string;
  prompt: string;
  whatYouGet: string;
};
