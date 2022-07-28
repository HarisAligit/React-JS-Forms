import "./App.css";
import OwnSimpleForm from "./Components/Formik/OwnSimpleForm";
import TicketForm from "./Components/Formik/TicketForm";
import ClassCom1 from "./Components/Class/classCom";
import RenderPropsParent from "./Components/RenderProps/RenderPropsParent";

function App() {
  return (
    <div>
      <OwnSimpleForm />
      <RenderPropsParent />
    </div>
  );
}

export default App;
