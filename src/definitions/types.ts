export type BillingPlan = {
    id?: string
    customerId?: string
    monthlyCredits?: number
    usedCredits?: number
    additionalCredits?: number
    remainingCredits?: number
    deptLimit?: number
}

export type BillingPlanRespones = {
    data: {
        billing: BillingPlan
    }
}
