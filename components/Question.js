import React from 'react';
import R from 'ramda';
import QuestionActions from '../actions/QuestionActions';
//import R from 'ramda';

class Question extends React.Component {
	constructor(props) {
		super(props);
		this.state = { };
    this._onSelect = this._onSelect.bind(this);
	}
  // Update the corresponding question with the selected answer value.
  _onSelect(value) {
    return () => {
      let id = parseInt(this.props.question.id);
      QuestionActions.update(id, parseInt(value));
    }
  }

  render() {
    return (
      <div>
        {this.props.question.text}
        <ul>
          {R.values(R.mapObjIndexed((text, i) => {
            return (
              <li
                onClick={this._onSelect(i)}
                className={this.props.question.value === parseInt(i) ? 'selected' : ''}>
                {text}
              </li>
            );
          }, [
            'Not at all',
            'Several days',
            'More than half the days',
            'Nearly every day'
          ]))}
        </ul>
      </div>
    );
  }
}

Question.propTypes = {
  question: React.PropTypes.object.isRequired
};

export default Question;
