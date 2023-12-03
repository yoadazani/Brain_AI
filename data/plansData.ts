export const plansData = [
    {
        title: "Free",
        description: "The most free trial plan.",
        planOptions: [
            {option: "5 queries limit to test", available: true},
            {option: "queries limit per day", available: false},
        ],
        price: undefined
    },
    {
        title: "Standard",
        description: "The most basic plan.",
        planOptions: [
            {option: "10 queries limit per day", available: true},
        ],
        price: 20
    },
    {
        title: "Premium",
        description: "The most basic plan.",
        planOptions: [
            {option: "Unlimited queries limit", available: true},
        ],
        price: 40
    }
]