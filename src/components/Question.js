import React from "react";
import { AnswerButton } from "./";
import { decodeHTML, randomizeArray } from "../lib";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessed: false,
      guess: "",
      answers: [],
    };

    // convert all answers into a single array, and randomize the array
    // this.answers = randomizeArray([
    //   ...props.question.incorrect_answers,
    //   props.question.correct_answer,
    // ]);
  }

  randomizeAnswers = () => {
    this.setState({
      answers: randomizeArray([
        ...this.props.question.incorrect_answers,
        this.props.question.correct_answer,
      ]),
    });
  };

  componentDidMount() {
    this.randomizeAnswers();
  }
  componentDidUpdate(prevProps) {
    if (this.props.question != prevProps.question) {
      console.log("question got changed");
      this.randomizeAnswers();
      this.setState({ guessed: false, guess: "" });
    }
  }

  handleGuess = (answer) => {
    // set guessed to true, and set guess to the selected answer
    this.setState({ guessed: true, guess: answer });
  };

  render() {
    return (
      <div className="card p-2 mb-4">
        <h3 className="fw-lighter fs-5 mb-4">{this.props.question.category}</h3>
        <h4 className="fw-light fs-5 mb-4">
          {decodeHTML(this.props.question.question)}
        </h4>

        <div>
          {this.state.answers &&
            this.state.answers.map((answer) => (
              <AnswerButton
                key={answer}
                answer={answer}
                handleGuess={() => this.handleGuess(answer)}
              />
            ))}
          {this.state.guessed && (
            <div>
              {this.state.guess === this.props.question.correct_answer ? (
                <h1 className="text-success">Correct!</h1>
              ) : (
                <h1 className="text-danger">
                  Incorrect! the answer is {this.props.question.correct_answer}
                </h1>
              )}
            </div>
          )}
        </div>

        {/* Dynamically render correct/incorrect here! */}
      </div>
    );
  }
}

export { Question };
