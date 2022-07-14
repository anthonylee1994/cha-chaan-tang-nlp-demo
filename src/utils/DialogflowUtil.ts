const textResponse = (text: string) => {
    return {
        fulfillmentMessages: [
            {
                text: {
                    text: [text],
                },
            },
        ],
    };
};

const cardResponse = (card: {title: string; subtitle: string; imageUri?: string; buttons?: {text: string; postback: string}[]}) => {
    return {
        fulfillmentMessages: [
            {
                card,
            },
        ],
    };
};

export const DialogflowUtil = Object.freeze({
    textResponse,
    cardResponse,
});
