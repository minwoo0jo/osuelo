import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pagination extends Component {
    constructor(props) {
        super(props)
        var destination = '/' + this.props.type + '/'
        if(this.props.type === "country")
            destination = '/users/country'
        else {
            if(this.props.country !== undefined && this.props.country !== 'Global')
                destination += 'country/' + this.props.country + '/'
            else
                destination += 'page/'
        }
        this.state = {
            destination: destination,
            current: parseInt(this.props.pageNum),
            total: Math.ceil((this.props.count * 1.0) / 50),
            pageLinks: []
        }
        
    }
    componentDidMount() {
        this.setState({
            pageLinks: [this.state.current - 2, this.state.current - 1,
                this.state.current, this.state.current + 1, this.state.current + 2]
        })
    }
  render() {
    const fastBackButton = () => {
        if(this.state.current > 1)
            return (
                <>
                    <Link to={{pathname: `${this.state.destination}1`, page: 1, country: this.props.country}}>&lt;&lt;</Link>
                    &nbsp;&nbsp;
                </>
            )
        return
    }
    const fastForwardButton = () => {
        if(this.state.current !== this.state.total)
            return (
                <Link to={{pathname: `${this.state.destination}${this.state.total}`, page: this.state.total, country: this.props.country}}>&gt;&gt;</Link>
            )
        return
    }
    const pages = this.state.pageLinks.map(page => {
        if(page === this.state.current)
            return (
                <>{page}&nbsp;&nbsp;</>
            )
        else if(page > 0 && page <= this.state.total)
            return (
                <>
                    <Link to={{pathname: `${this.state.destination}${page}`, page: page, country: this.props.country}}>{page}</Link>
                    &nbsp;&nbsp;
                </>
            )
        return (
            <></>
        )
    })
    return (
      <div>
          {fastBackButton()}
          {pages}
          {fastForwardButton()}
      </div>
    );
  }
}

export default Pagination;