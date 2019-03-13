import React, { Component } from 'react';
import { connect } from '../shared/store';

class Feed extends Component {
    render() {
        const { data } = this.props;

        return (
            <div>
                {
                    data.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.content}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.feed.data
    };
}

const mapDispatchToProps = () => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
