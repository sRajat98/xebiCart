import React from 'react';
import dog from '../images/swg'

export default function ErrorView(payload) {
    const { error } = payload
    return (
        <div>
            {
                error === undefined ?
                    <img src={dog} /> :
                    <div>
                        <p>{error.statusText} {error.status} </p>
                        <img src={dog} />
                    </div>
            }

        </div>
    )
}
