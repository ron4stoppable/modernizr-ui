/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('react/lib/cx');
var NavSlider = require('../nav-slider');

var MainNav = React.createClass({
  getInitialState: function() {
    return {
      active: false
    };
  },

  componentDidMount: function() {
    this.navSlider = new NavSlider();
    this._checkSlider();
    this.started = false;
  },

  render: function() {
    return (
      <div className={cx({MainNav: true, 'u-fullHeight': true, 'js-main-nav': true})}>
        <div ref="mid" className="MainNav-mid u-removeWhitespace u-fullHeight js-main-nav__mid">
          <div ref="inner" className="MainNav-inner u-contain js-main-nav__inner">
            <ul className="NavList u-stretch u-removeWhitespace js-nav-list c-contrast">
              {this.props.items.map(function(item) {
                return (
                  <li className="NavList-item">
                    <a href="#" className="NavList-link u-vcContainer">
                      <div className="u-vc u-textCenter">
                        <span className="t-body t-action NavList-underline">{item}</span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="MainHeader-block">
              <div className="FruitMachine js-main-nav__start u-fullHeight" ref="startBtn" onClick={this._onStartClick}>
                <div className="FruitMachine-transport u-fullHeight">
                  <div className="FruitMachine-item u-fullHeight">
                    <div className="c-btn u-fullHeight Btn u-textCenter">
                      <strong className="t-action t-label">Start</strong>
                    </div>
                  </div>
                  <div className="FruitMachine-item u-fullHeight">
                    <div className="MainNav-icon MainHeader-block u-fullHeight js-main-nav__menu-icon u-contain c-contrast">
                      <div className="MenuIcon u-stretch">
                        <div className="MenuIcon-bar c-menuBar" />
                        <div className="MenuIcon-bar c-menuBar" />
                        <div className="MenuIcon-bar c-menuBar" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _onStartClick: function() {
    if(this.started) return;
    $(this.refs.startBtn.getDOMNode()).addClass('is-moved');
    this.navSlider.toggle();
    $('.SearchBar').focus();
    this.started = true;
    this.props.onStartClick();
  },

  _toggle: function() {
    this.setState({
      active: !this.state.active
    });
  },

  _checkSlider: function() {
    if(this.props.page === 'index') {
      this.navSlider.toggle({
        first: true
      });
    }
  }
});

module.exports = MainNav;
