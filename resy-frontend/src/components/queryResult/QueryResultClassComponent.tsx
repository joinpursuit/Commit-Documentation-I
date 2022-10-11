import { ApolloError } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import React from "react";

interface QueryResultProps<T> {
    loading: boolean;
    error: ApolloError | undefined;
    data: T | undefined;
    children: JSX.Element | JSX.Element[] | undefined; // React.ReactChild | React.ReactChild[]
}

export default class QueryResult<T> extends React.Component<QueryResultProps<T>> {
    render() {
        if (this.props.error) {
            return <p>ERROR: {this.props.error.message}</p>;
        }
        if (this.props.loading) {
            return (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            );
        }
        if (this.props.data && this.props.children) {
            return (
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            );
        } else {
            return <p>Nothing to show...</p>;
        }
    }
}

  