import React from 'react';
import R from 'ramda';
import Question from './Question';
import Recommendation from './Recommendation';
import QuestionStore from '../stores/QuestionStore';

class Questions extends React.Component {
	constructor(props) {
		super(props);
    // Pull in the list of questions + their answer values.
    this.state = { 
      questions: QuestionStore.getQuestions()
    };
    this._onChange = this._onChange.bind(this);
	}
	componentDidMount() {
    QuestionStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    QuestionStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState({
      questions: QuestionStore.getQuestions()
    });
  }
  render() {
    // Set the results element.
    var total = QuestionStore.getTotal();
    var severity = ' ' + total + '/27 ';
    var className = 'incomplete';
    if (QuestionStore.areAllAnswered()) {
      if (total < 5) {
        severity = 'None';
      } else if (total < 10) {
        severity = 'Mild';
      } else if (total < 15) {
        severity = 'Moderate';
      } else if (total < 20) {
        severity = 'Moderately Severe';
      } else {
        severity = 'Severe';
      }
      className = severity.toLowerCase().replace(' ', '-');
    } else {
      severity = 'Please answer all questions.';
    }
    var results = (
      <span className={'results ' + className}>
        <span className={'score'}>{total + '/27'}</span>{severity}
      </span>
    );
    return (
      <div style={{marginTop: '30px'}}>
        {R.map((q) => (
          <Question
            key={q.id}
            question={q} />
        ), this.state.questions)}
        <hr />
        <h3>
          Depression severity:
        </h3>
        {results}
        {total > 9 && QuestionStore.areAllAnswered() ? <Recommendation /> : null}
      </div>
    );
  }
}

export default Questions;
