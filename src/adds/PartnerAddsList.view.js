import React, { Component } from 'react';
import { connect } from 'react-redux';

class PartnerAddsListView extends Component {
    render() {
        return(
            <React.Fragment>
                Partner adds list
            </React.Fragment>
        );
    }
}

const mapStateToProps = () => {
    return {};
}

const mapDispatchToProps = () => {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerAddsListView);
