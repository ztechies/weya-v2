export const isErrorResult = (result: any): result is { error: { message: string } } => {
    return result && typeof result === 'object' && 'error' in result;
};