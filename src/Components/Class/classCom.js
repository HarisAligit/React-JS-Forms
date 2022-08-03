import { Component } from "react";

class ClassCom1 extends Component {
  constructor(props) {
    console.log("Constructor Called!");
    super(props);
  }

  componentDidMount() {
    console.log("ComponentDidMount!");
  }

  componentDidUpdate() {
    console.log("Component Updated!");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    return (
      <div>
        {console.log("Render Called!")}
        Hello! I am the classCom1 component I have been called from
        RenderPropsParent
        {this.props.render()}
      </div>
    );
  }
}

export default ClassCom1;
