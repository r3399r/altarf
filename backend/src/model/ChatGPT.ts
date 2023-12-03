export type Completion = {
  id: string; // chatcmpl-8OHGQsrZkua6ES9CGiXUFvCEm7JJY,
  object: string; // chat.completion
  created: number; // 1700796926
  model: string; // gpt-3.5-turbo-0613
  choices: {
    index: number; // 0
    message: {
      role: string; // assistant
      content: string; // Hello! How can I assist you today?
    };
    finish_reason: string; // stop
  }[];
  usage: {
    prompt_tokens: number; // 8
    completion_tokens: number; // 9
    total_tokens: number; // 17
  };
};
