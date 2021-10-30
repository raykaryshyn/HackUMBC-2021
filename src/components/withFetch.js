import React from 'react';

function withFetch(WrappedComponent, requestUrl) {
    class WithFetch extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: []
            };
        }

        componentDidMount() {
            if (requestUrl) {
                this.fetchData(requestUrl);
            }
        }

        fetchData = async (requestUrl) => {
            console.log("withFetch() was called...");

            this.setState({
                data: []
            });

            try {
                const response = await fetch(requestUrl);

                if (response.ok) {
                    const data = await response.json();
                    this.setState({
                        data
                    });
                } else {
                    throw new Error('Fetch request error');
                }

            } catch (err) {
                // handle an error
            }
        };

        render() {
            return (
                <WrappedComponent {...this.state} {...this.props}
                    getData={(requestUrl) => this.fetchData(requestUrl)} />
            )
        }
    }

    return WithFetch;
}

export default withFetch;
