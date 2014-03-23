/**
 * @jsx React.DOM
 */

var React = require('react/react');
var MetadataActions = require('../actions/MetadataActions');
var SelectionActions = require('../actions/SelectionActions');
var MetadataStore = require('../stores/Metadata');
var ResultsStore = require('../stores/Results');
var SelectionStore = require('../stores/Selection');
var WithFlux = require('../mixins/WithFlux');
var _ = require('lodash');

var Header = require('jsx-loader!./Header.jsx');
var ResultList = require('jsx-loader!./ResultList.jsx');
var Detail = require('jsx-loader!./Detail.jsx');
var Search = require('jsx-loader!./Search.jsx');

var App = React.createClass({
	mixins: [WithFlux],
	stores: [MetadataStore, ResultsStore, SelectionStore],
	storeStates: {
		'ResultsStore': {
			results: ResultsStore.getResults,
			currentIndex: ResultsStore.getCurrentIndex,
			isFiltered: ResultsStore.isFiltered,
			searchValue: ResultsStore.getSearchValue,
			currentTag: ResultsStore.getCurrentTag,
			currentType: ResultsStore.getCurrentType
		},
		'SelectionStore': {
			selection: SelectionStore.getSelection
		}
	},

	componentWillMount: function() {
		MetadataActions.fetch();
	},

	_getResultNameByType: function(type) {
		switch(type) {
			case 'detect':
				return 'detects';
			break;
			case 'extra':
				return 'extras';
			break;
			case 'api':
				return 'API methods'
			break;
			default:
				return 'results';
			break;
		}
	},

	render: function() {
		var selectionCount = _.size(this.state.selection) || 0;
		var currentResult = this.state.results && !isNaN(this.state.currentIndex) && this.state.results[this.state.currentIndex];

		return (
			<div className="app">
				<Header count={selectionCount} searchComponent={
					<Search onSearchChange={this.handleSearchChange} searchValue={this.state.searchValue} />
				} />
				<div className="main row">
					{this.state.results &&
					<div className="main__sidebar row__column">

						{this.state.currentTag &&
							<div className="current-filter" onClick={this._onCurrentFilterClick}>
								{this.state.currentTag.name}
							</div>
						}

						{this.state.currentType &&
							<div className="current-filter" onClick={this._onCurrentFilterClick}>
								{this._getResultNameByType(this.state.currentType)}
							</div>
						}

						{(this.state.isFiltered && 
							<div className="results-state-label">
								{this.state.results.length} {this._getResultNameByType(this.state.currentType)}
							</div>
						) || 
						<div className="results-state-label">
							Showing all {this.state.results.length} {this._getResultNameByType(this.state.currentType)}
						</div>
						}

						<ul className="results-actions">
							{(selectionCount === this.state.results.length &&
								<li><a href="#" onClick={this._onRemoveAllClick} className="t_action t_label c_action">REMOVE THESE ({this.state.results.length})</a></li>
							) ||
								<li><a href="#" onClick={this._onAddAllClick} className="t_action t_label c_action">ADD THESE ({this.state.results.length})</a></li>
							}
						</ul>
					</div>
					}
					<div className="main__results row__column">
						<ResultList results={this.state.results} currentResult={currentResult} selection={this.state.selection} currentIndex={this.state.currentIndex} />
					</div>
					<div className="main__detail row__column">
						{(currentResult &&
						<Detail detect={currentResult} onClose={this.handleDetailClose} />
						) || 
						<div className="detail detail--intro">
							<h1>Welcome to<br />Modernizr's detect library.</h1>
							<p>You can browser detects to find out about browser features, and also add detects to a build, ready to use on your project.</p>
							<p><i>[Add more instructions here]</i></p>
						</div>
						}
					</div>
				</div>
			</div>
		);
	},

	_onCurrentFilterClick: function() {
		ResultActions.blur();
	},

	_onRemoveAllClick: function() {
		SelectionActions.remove(this.state.results);
	},


	_onAddAllClick: function() {
		SelectionActions.add(this.state.results);
	}
});

module.exports = App;
