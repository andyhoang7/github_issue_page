import React, { Component } from 'react';
import ReposCard from "./ReposCard"

class Repos extends Component {

    render() {
        return (
            <div>
                {this.props.allRepos.map(repo=>(
                    <ReposCard getIssue={this.props.getIssue} repo={repo} />
                )
                    
                )}
            </div>
        );
    }
}

export default Repos;