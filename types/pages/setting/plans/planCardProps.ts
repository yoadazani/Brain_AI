type PlanOptions = {
    option: string
    available: boolean
}

export type PlanCardProps = {
    title: string
    description: string
    planOptions: PlanOptions[]
    price: number | undefined
}