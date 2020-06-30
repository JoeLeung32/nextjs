import React from 'react'
import Router from 'next/router'

const styledBackBtn = {
    color: 'blue',
    cursor: 'pointer',
    outline: 0,
}

const BtnHistoryGoBack = () => {
    return (
        <div
            role={`button`}
            tabIndex={0}
            style={styledBackBtn}
            onClick={() => Router.back()}
            onKeyDown={() => Router.back()}
        >
            <span>Go Back</span>
        </div>
    )
}

export default BtnHistoryGoBack
