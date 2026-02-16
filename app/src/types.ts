export interface PromptMeta {
  title: string;
  category: string;
  tags: string[];
}

export interface Prompt {
  meta: PromptMeta;
  body: string;
  filename: string;
}
