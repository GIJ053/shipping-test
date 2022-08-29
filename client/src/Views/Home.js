import ShippingForm from "../components/ShippingForm"

const Home = () => (
    <div className="hero bg-base-100 basis-11/12 my-6">
        <div className="hero-content h-full w-11/12 flex-col gap-1 bg-secondary rounded-2xl">
            <ShippingForm />
        </div>
    </div>
)

export default Home