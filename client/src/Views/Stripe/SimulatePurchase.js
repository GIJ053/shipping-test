import { simulateNonStripePurchase } from "../../services/transactions"

export const SimulatePurchase = () => {
    const purchaseDetails = {
        cost: 10000,
        sellerId: 'acct_1LfsOqR1tLBr9CRo'
    }

    const handleClick = async () => {
        await simulateNonStripePurchase(purchaseDetails).then(response => {
            console.log(response.data);
            alert("The seller account has earned: $" + response.data.amount)
        })
    }

    return (
        <div className="hero bg-base-100 basis-11/12 my-6">
            <div className="hero-content h-full w-11/12 flex-col gap-1 bg-secondary rounded-2xl">
                <div className="w-full h-full">
                    <button type="button" onClick={handleClick} className="btn">Create</button>
                </div>
            </div>
        </div>
    )
}