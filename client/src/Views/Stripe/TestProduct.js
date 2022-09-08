export const TestProduct = (props) => {
    return (
        <div className="hero bg-base-100 basis-11/12 my-6">
            <div className="hero-content h-full w-11/12 flex-col gap-1 bg-secondary rounded-2xl">
                <div className="w-full h-full">
                    <form action="/create-checkout-session" method="POST">
                        <button type="submit" className="btn">Checkout</button>
                    </form>
                </div>
            </div>
        </div>
    )
}