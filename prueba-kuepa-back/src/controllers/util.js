export function BadRequest(message) {
    return {
        status: 400,
        message,
    };
}
