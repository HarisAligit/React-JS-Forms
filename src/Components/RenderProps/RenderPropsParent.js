import ClassCom1 from "../Class/classCom";

const RenderPropsParent = () => {
  return (
    <div>
      <ClassCom1
        render={() => {
          <div>
            That is the stuff being Rendered with the usage of Rendered Props!
          </div>;
        }}
      />
      Hello I am the Parent: RenderPropsParent
    </div>
  );
};

export default RenderPropsParent;
