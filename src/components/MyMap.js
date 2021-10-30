// Todos.js
import React from 'react';

class MyMap extends React.Component {

    renderTodos() {
        if (!this.props.data) return;

        const today = new Date();
        const latList = (
            <>
                <h1>MyMap ({today.toISOString()})</h1>
                <ul>{this.props.data.map(todo => (
                    <li>{todo.Latitude}</li>
                ))}</ul>
            </>
        );

        return latList;
    }

    render() {
        return <>{this.renderTodos()}</>;
    }
}

export default MyMap;
