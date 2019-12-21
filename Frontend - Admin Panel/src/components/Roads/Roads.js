import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Spin, Alert } from "antd";
import "antd/dist/antd.css";

import { getAllRoads } from "../../redux/actions/adminActions";
import LoginRequired from "../LoginRequired/LoginRequired";

class Roads extends Component {
    state = {
        msg: null,
        roads: [
            {
                _id: 1,
                name: "road1",
                type: 1
            }
        ],
        loading: false
    };

    componentDidUpdate = prevProps => {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === "GET_ALL_ROADS_FAIL") {
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
        let { roads, loading, msg } = this.state;
        console.log(roads);

        let roadList =
            roads && !loading
                ? roads.map(road => {
                    return (
                        <div className="col-lg-4 col-md-6" key={road._id}>
                            <div className="card">
                                <h5 className="card-header">Name: <Link to={`/road/${road._id}`} className="card-title">{road.name}</Link></h5>
                                <div className="card-body">
                                    {/* <h5 className="card-title">{road.name}</h5> */}
                                    <p className="card-text"><b>Description:</b> {road.name}</p>
                                    <p className="card-text"><b>Location:</b> {road.name}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
                : [
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
                ];

        if (msg !== null) {
            roadList = "";
        }

        if (this.props.isAuthenticated) {
            return (
                <div style={{ margin: "20px" }}>
                    {msg ? <Alert message={msg} type="error" /> : null}
                    <div className="container-fluid">
                        <div className="row">
                            {roadList.length ? (
                                roadList
                            ) : (
                                    <Alert message="No roads found!" type="warning" />
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
        roads: state.admin.roads,
        loading: state.admin.loading
    };
}

export default connect(mapStateToProps, { getAllRoads })(Roads);
