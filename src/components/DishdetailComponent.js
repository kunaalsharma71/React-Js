import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  Label,
  Row,
  ModalBody,
  ModalHeader
} from "reactstrap";
import { LocalForm, Errors, Control } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

const required = val => val && val.length;
const minLength = len => val => val && val.length >= len;
const maxLength = len => val => !val || val.length <= len;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
      <div className="container">
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-edit"></span>Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody className="m-3">
            <LocalForm
              onSubmit={values => {
                this.handleSubmit(values);
              }}
            >
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  model=".author"
                  name="author"
                  id="author"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required; ",
                    minLength: "Should be greater than 2 characters; ",
                    maxLength: "Should be less than 16 characters; "
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  name="comment"
                  id="comment"
                  className="form-control"
                  rows="6"
                />
              </Row>
              <Row className="form-group">
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderComments({ comments, dishId, addComment }) {
  if (comments != null)
    return (
      <div className="col-12 col-md-5 m-1" style={{ textAlign: "left" }}>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map(com => {
            return (
              <li key={com.id}>
                <p>{com.comment}</p>
                <p>
                  -- {com.author},
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(new Date(Date.parse(com.date)))}
                </p>
              </li>
            );
          })}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
}

const DishDetail = props => {
  if (props.isLoaing) {
    return(
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  else if (props.errMess){
    return(
    <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
else if(props.dish != null)
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments
          comments={props.comments}
          dishId={props.dish.id}
          addComment={props.addComment}
        />
      </div>
    </div>
  );
};

export default DishDetail;