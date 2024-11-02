import { Message } from '@copilotkit/shared';

interface Chat extends Record<string, any> {
    id: string;
    title: string;
    createdAt: Date;
    userId: string;
    path: string;
    messages: Message[];
    sharePath?: string;
}
type ServerActionResult<Result> = Promise<Result | {
    error: string;
}>;

export { Chat, ServerActionResult };
