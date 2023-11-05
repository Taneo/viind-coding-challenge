import { BillingPlanRespones } from '../definitions/types'
import { apiProvider } from './api.provider'

class CustomerService {
    public static getBillingPlanByCustomerId(
        customerId: string
    ): Promise<BillingPlanRespones> {
        const resource = '/graphql'
        const variables = {
            customerId,
        }
        return apiProvider.post<BillingPlanRespones>(resource, {
            query: `query($customerId: String!) {
                billing(customerId: $customerId) {
                    id
                    customerId
                    monthlyCredits
                    usedCredits
                    additionalCredits
                    remainingCredits
                    debtLimit
                }
            }`,
            variables,
        })
    }

    public static addMonthlyCredits(credits: number) {
        const resource = '/graphql'
        const variables = {
            additionalCredits: credits,
        }
        return apiProvider.post<unknown>(resource, {
            query: `mutation($additionalCredits: Int!) {
                            addAdditionalCredits(customerId: "1234", additionalCredits: $additionalCredits) {
                            customerId
                            additionalCredits
                        }
                    }`,
            variables,
        })
    }
}

export default CustomerService
