import R from 'ramda';
import {EventEmitter} from 'events';
//var EventEmitter = require('events').EventEmitter;
import Dispatcher from '../dispatcher/Dispatcher';
//var Dispatcher = require('../dispatcher/Dispatcher');

var _questions = [
  {
    text: "Little interest or pleasure in doing things?",
    id: 0,
    value: null
  },
  {
    text: "Feeling down, depressed, or hopeless?",
    id: 1,
    value: null
  },
  {
    text: "Trouble falling or staying asleep, or sleeping too much?",
    id: 2,
    value: null
  },
  {
    text: "Feeling tired or having little energy?",
    id: 3,
    value: null
  },
  {
    text: "Poor appetite or overeating?",
    id: 4,
    value: null
  },
  {
    text: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
    id: 5,
    value: null
  },
  {
    text: "Trouble concentrating on things, such as reading the newspaper or watching television?",
    id: 6,
    value: null
  },
  {
    text: "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
    id: 7,
    value: null
  },
  {
    text: "Thoughts that you would be better off dead, or of hurting yourself in some way?",
    id: 8,
    value: null
  }
];

function update(i, value) {
  _questions[i].value = value;
}

var QuestionStore = Object.assign({}, EventEmitter.prototype, {
  // Get all questions/answers
  getQuestions: function() {
    return _questions;
  },
  // Calculate the total score from all answered questions.
  getTotal: function() {
    return R.reduce(R.add, 0, R.map(R.prop('value'), _questions));
  },
  // Returns whether or not all questions have been answered
  areAllAnswered: function() {
    return R.not(
      R.any(
        R.equals(null),
        R.map(R.prop('value'), _questions)
      )
    );
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

Dispatcher.register((action) => {
  // Make sure the answer's score value is valid
  if (action.actionType === 'update' && R.any(R.equals(action.value), [0,1,2,3])) {
    update(action.id, action.value);
    QuestionStore.emitChange();
  }
});

export default QuestionStore;
