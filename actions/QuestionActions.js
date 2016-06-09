import Dispatcher from '../dispatcher/Dispatcher';

var QuestionActions = {
  update: function(id, value) {
    Dispatcher.dispatch({
      actionType: 'update',
      id: id,
      value: value
    });
  }
};

export default QuestionActions;
