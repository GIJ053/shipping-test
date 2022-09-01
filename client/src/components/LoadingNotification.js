export const LoadingNotification = ({loading}) => (
    <div className="toast">
        <div className={`alert alert-info ${loading ? "" : "hidden"}`}>
            <div>
                <span>Loading</span>
            </div>
        </div>
    </div>
)