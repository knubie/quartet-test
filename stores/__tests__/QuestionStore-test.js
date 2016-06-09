jest.unmock('../QuestionStore');
jest.unmock('ramda');

import Dispatcher from '../../dispatcher/Dispatcher';
import QuestionStore from '../QuestionStore';
import R from 'ramda';

describe('QuestionStore', () => {
  it('Initializes with unanswered questions', () => {
    const questions = QuestionStore.getQuestions();
    expect(
      R.all(R.equals(null), R.map(R.prop('value'), questions))
    ).toBe(true);
  });

  it('Can determine if all questions have been answered', () => {
    expect(QuestionStore.areAllAnswered()).toBe(false);

    const questions = QuestionStore.getQuestions();
    const callback = Dispatcher.register.mock.calls[0][0];
    R.map((q) => {
      callback({
        actionType: 'update',
        id: q.id,
        value: 2
      });
    }, questions);
    expect(QuestionStore.areAllAnswered()).toBe(true);
  });
  it('Can get the total score', () => {
    const questions = QuestionStore.getQuestions();
    const callback = Dispatcher.register.mock.calls[0][0];
    R.map((q) => {
      callback({
        actionType: 'update',
        id: q.id,
        value: 2
      });
    }, questions);
    expect(QuestionStore.getTotal()).toBe(questions.length * 2);
  });
});
