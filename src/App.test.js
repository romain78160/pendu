import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'


import App from './App'
import Parameters from './parameters'


describe('<App />', () => {
  it('Test App contain parameter', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).to.contain(
        <Parameters currentWord="" onClickPlay={()=>{console.log("click Play")}} />
    )
    
  })

  it('should trigger its `onClick` prop when clicked', () => {
    // const onClick = jest.fn()
    const onClick = sinon.spy()
    const wrapper = shallow(
      <Parameters currentWord="" onClickPlay={onClick} />
    )

    wrapper.simulate('click')
    // expect(onClick).toHaveBeenCalledWith(0) //Jest
    expect(onClick).to.have.been.calledWith(0) //chai
  })
})

