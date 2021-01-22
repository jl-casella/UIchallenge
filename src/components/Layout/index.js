import React from 'react'
import PropTypes from 'prop-types'

const PackageTab = ({ number, active }) => (
  <div
    style={{
      display: 'inline-block',
      padding: 10,
      borderWidth: 1,
      fontWeight: active ? 'bold' : 'normal',
    }}
  >
    <a>Package {number}</a>
  </div>
)

PackageTab.propTypes = {
  number: PropTypes.number.isRequired,
  active: PropTypes.bool,
}

const Package = () => (
  <div style={{ padding: 50 }}>
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>name</th>
          <th>quantity</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Green Ball</td>
          <td>2</td>
        </tr>

        <tr>
          <td>Blue Ball</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>
  </div>
)

const Layout = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <div style={{ width: '50%', padding: 20, borderRight: '1px solid grey' }}>
      Unpacked products
    </div>

    <div style={{ width: '50%', padding: 20 }}>
      <h3>Packed Products</h3>
      <button>Add Package</button>
      <hr />
      <PackageTab number={1} />
      <PackageTab active number={2} />
      <PackageTab number={3} />
      <PackageTab number={4} />
      <Package />
    </div>
  </div>
)

export { Layout }
