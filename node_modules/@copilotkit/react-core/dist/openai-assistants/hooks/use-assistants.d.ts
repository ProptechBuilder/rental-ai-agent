import { Message } from '@copilotkit/shared';

type AssistantStatus = "in_progress" | "awaiting_message";
interface UseAssistantResult {
    messages: Message[];
    input: string;
    handleInputChange: (e: any) => void;
    submitMessage: (e: any) => Promise<void>;
    status: AssistantStatus;
    error: unknown;
}
declare function experimental_useAssistant({ api, threadId: threadIdParam, }: {
    api: string;
    threadId?: string | undefined;
}): UseAssistantResult;

export { AssistantStatus, UseAssistantResult, experimental_useAssistant };
