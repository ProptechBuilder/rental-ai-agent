declare function processMessageStream(reader: ReadableStreamDefaultReader<Uint8Array>, processMessage: (message: string) => void | Promise<void>): Promise<void>;

export { processMessageStream };
