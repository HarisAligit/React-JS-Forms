// import OwnSimpleForm from "./Components/Formik/OwnSimpleForm";
import "bootstrap/dist/css/bootstrap.min.css";
// import BasicForm from "./Components/HookForm/BasicForm";
import BasicForm from "./Components/HookForm/BasicForm";
import BasicForm2 from "./Components/HookForm/BasicForm2";
import SimpleHookForm from "./Components/HookForm/SimpleHookForm";
import TicketForm from "./Components/HookForm/TicketForm";

function App() {
  return (
    <div>
      <p>This is to be rendered</p>
      <TicketForm />
      <SimpleHookForm />
    </div>
  );
}

export default App;
