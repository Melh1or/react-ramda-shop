import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as R from 'ramda'

import {addPhoneToBasket, fetchPhoneById} from '../../actions'
import {getPhoneById} from '../../selectors'
import BasketCart from '../../components/basket'

class Phone extends React.Component {

  componentDidMount() {
    this.props.fetchPhoneById(this.props.match.params.id)
  }

  renderFields() {
    const {phone} = this.props

    const columnField = R.compose(
      R.toPairs(),
      R.pick(['cpu', 'camera', 'size', 'display', 'weight', 'battery', 'memory'])
    )(phone)

    return columnField.map(([key, value]) => (
      <div key={value} className="column">
        <div className="ab-details-title">
          <p>{key}</p>
        </div>
        <div className="ab-details-info">
          {value}
        </div>
      </div>
    ))
  }

  renderContent() {
    const {phone} = this.props

    return (
      <div className='thumbnail'>
        <div className="row">
          <div className="col-md-6">
            <img
              src={phone.image}
              alt={phone.name}
              className="img-thumbnail"
            />
          </div>
          <div className="col-md-6">
            {this.renderFields()}
          </div>
        </div>
        <div className="caption-full">
          <h4 className='pull-right'>${phone.price}</h4>
          <h4>{phone.name}</h4>
          <p>{phone.description}</p>
        </div>
      </div>
    )
  }

  renderSidebar() {
    const {phone, addPhoneToBasket} = this.props
    return (
      <div>
        <p className="lead">Quick shop</p>
        <BasketCart />
        <div className="form-group">
          <h1>{phone.name}</h1>
          <h2>${phone.price}</h2>
        </div>
        <Link to='/' className='btn btn-block btn-info'>
          Back to store
        </Link>
        <button
          type='button'
          className='btn btn-success btn-block'
          onClick={() => addPhoneToBasket(phone.id)}
        >
          Add to cart
        </button>
      </div>
    )
  }

  render() {
    const {phone} = this.props

    return (
      <div className='view-container'>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {phone && this.renderContent()}
            </div>
            <div className="col-md-3">
              {phone && this.renderSidebar()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  phone: getPhoneById(state, state.phonePage.id)
})

const mapDispatchToProps = {
  fetchPhoneById,
  addPhoneToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Phone)
