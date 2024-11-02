declare const nanoid: (size?: number | undefined) => string;
declare function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON>;
declare function formatDate(input: string | number | Date): string;

export { fetcher, formatDate, nanoid };
