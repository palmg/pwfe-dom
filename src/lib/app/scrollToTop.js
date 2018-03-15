import React from 'react'

/**
 * 当页面被切换时，将滚动条滚动到顶端。
 * //TODO 目前默认是滚动window对象，需要进一步完善
 */
class ScrollToTop extends React.Component{
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location && 0 !== window.scrollY) {
            window.scrollTo(0, 0)
            console.log('to top');
        }
    }

    render() {
        return this.props.children
    }
}

export default ScrollToTop