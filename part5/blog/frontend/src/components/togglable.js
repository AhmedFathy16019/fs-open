import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = {display: visible ? '' : 'none'}
    const hideWhenVisible = {display: visible ? 'none': ''}

    const toggleVisible = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisible
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisible} id='visible-button'>{ props.buttonLabel }</button>
            </div>
            <div style={showWhenVisible}>
                { props.children }
                <button onClick={toggleVisible}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable