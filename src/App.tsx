import React, { useCallback, useEffect, useState } from 'react'
import CustomerService from './services/customer.service'
import { BillingPlan } from './definitions/types'

const App = () => {
    const [billingPlan, setBillingPlan] = useState<BillingPlan>()
    const [monthlyCreditsValue, setMonthlyCreditsValue] = useState<number>(0)

    const fetchBillingPlan = useCallback(() => {
        return CustomerService.getBillingPlanByCustomerId('1234').then(
            (res) => {
                setBillingPlan(res?.data.billing)
            }
        )
    }, [])

    const setMonthlyCredits = useCallback(
        (credits: number) => {
            return CustomerService.addMonthlyCredits(credits).then(() => {
                fetchBillingPlan()
            })
        },
        [fetchBillingPlan]
    )

    const handleOnSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        setMonthlyCredits(monthlyCreditsValue)
    }

    const handleOnInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = Number(event.currentTarget.value)
        setMonthlyCreditsValue(value)
    }

    useEffect(() => {
        fetchBillingPlan()
    }, [fetchBillingPlan])

    if (!billingPlan) return <h1>Billingplan is currently being fetched...</h1>

    return (
        <div className="flex flex-col p-32 w-800 m-auto">
            <h1 className="text-5xl mb-5">Billing Plan Details</h1>
            <h3 className="text-2xl">Customer ID: {billingPlan?.customerId}</h3>
            <div>
                <p className="text-lg">
                    Credits: {billingPlan?.remainingCredits} /{' '}
                    {billingPlan?.monthlyCredits}
                </p>
                <p className="text-lg mb-5">
                    Zusätzlich gebuchte Credits:{' '}
                    {billingPlan?.additionalCredits}
                </p>
                <form onSubmit={handleOnSubmit} className="flex flex-col">
                    <label>
                        <p className="text-lg">
                            Passe deine monatlichen Credits an:
                        </p>
                        <input
                            defaultValue={0}
                            type="number"
                            name="monthlyCreditAdjust"
                            onChange={handleOnInputChange}
                            value={monthlyCreditsValue}
                            className="text-xl p-1 w-full mt-1 mb-2 rounded text-black outline-none"
                        />
                    </label>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Monatliches Limit anpassen
                    </button>
                </form>
            </div>
        </div>
    )
}

export default App
