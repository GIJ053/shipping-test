import { connectAccount } from "../../services/accounts"

export const CreateAccount = () => {
    const handleClick = async () => {
        await connectAccount().then(response => {
            console.log(response);
            window.location.href = response.url
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