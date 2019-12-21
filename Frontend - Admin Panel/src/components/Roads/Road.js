import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Spin, Alert } from "antd";
import "antd/dist/antd.css";

import LoginRequired from "../LoginRequired/LoginRequired";

class Road extends Component {
    state = {
        msg: null,
        road: {
            name: "road1"
        },
        loading: false
    };

    componentDidUpdate = prevProps => {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === "GET_ROAD_FAIL") {
                this.setState({
                    msg: error.message
                });
            } else {
                this.setState({
                    msg: null
                });
            }
        }
    };

    componentDidMount = async () => {
        // this.setState({
        //     loading: true,
        //     roads: []
        // });
        // await this.props.getAllRoads();
        // let { loading, roads } = this.props;
        // this.setState({
        //     loading,
        //     roads
        // });
    };

    render() {
        let { road, loading, msg } = this.state;

        let roadList =
            road && !loading
                ? <div className="col-lg-4 col-md-6" key={road._id}>
                        <div className="card">
                            <h5 className="card-header">Name: <Link to={`/road/${road._id}`} className="card-title">{road.name}</Link></h5>
                            <div className="card-body">
                            refguh
                            </div>
                        </div>
                    </div>
                : 
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    key="spinner"
                >
                    <Spin tip="Loading..." size="large"></Spin>
                </div>

        if (msg !== null) {
            roadList = "";
        }

        if (this.props.isAuthenticated) {
            return (
                <div style={{ margin: "20px" }}>
                    {msg ? <Alert message={msg} type="error" /> : null}
                    <div className="container-fluid">
                        <div className="row">
                            {roadList ? (
                                roadList
                            ) : (
                                    <Alert message="No road found!" type="warning" />
                                )}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <LoginRequired />;
        }
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error,
        user: state.auth.user,
        //road: state.admin.road,
        loading: state.admin.loading
    };
}

export default connect(mapStateToProps, {  })(Road);
