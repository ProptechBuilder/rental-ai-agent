import { Message } from '@copilotkit/shared';

type AssistantStatus = "in_progress" | "awaiting_message";
interface RequestForwardingOptions {
    /**
     * The credentials mode to be used for the fetch request.
     * Possible values are: 'omit', 'same-origin', 'include'.
     * Defaults to 'same-origin'.
     */
    credentials?: RequestCredentials;
    /**
     * HTTP headers to be sent with the API request.
     */
    headers?: Record<string, string> | Headers;
    /**
     * Extra body object to be sent with the API request.
     * @example
     * Send a `sessionId` to the API along with the messages.
     * ```js
     * useChat({
     *   body: {
     *     sessionId: '123',
     *   }
     * })
     * ```
     */
    body?: object;
}
interface UseCopilotChatOptionsV2 extends RequestForwardingOptions {
    makeSystemMessage?: (contextString: string) => string;
    threadId?: string | undefined;
}
interface UseCopilotChatV2Result {
    messages: Message[];
    input: string;
    handleInputChange: (e: any) => void;
    submitMessage: (e: any) => Promise<void>;
    status: AssistantStatus;
    error: unknown;
}
declare function useCopilotChatV2(options: UseCopilotChatOptionsV2): UseCopilotChatV2Result;
declare function defaultSystemMessage(contextString: string): string;

export { AssistantStatus, RequestForwardingOptions, UseCopilotChatOptionsV2, UseCopilotChatV2Result, defaultSystemMessage, useCopilotChatV2 };
