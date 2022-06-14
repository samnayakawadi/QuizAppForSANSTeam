const UserDashboardHome = () => {
    return (
        <div className="has-text-centered">
            <div className="box has-background-danger-light">
                <div className="box has-background-grey has-text-centered has-text-white">Dashboard Home</div>
            </div>
            {/* <div className="box p-3 has-background-primary has-text-white">HOME</div> */}

            <div className="box has-background-danger-light">
                <article className="message is-info">
                    <div className="message-header">
                        Instructions
                        {/* <button className="delete" /> */}
                    </div>
                    <div className="message-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur. Aenean ac eleifend lacus, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
                    </div>
                </article>
            </div>

        </div>
    )
}

export default UserDashboardHome;