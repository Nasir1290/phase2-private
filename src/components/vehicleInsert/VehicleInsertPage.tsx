import { ProgressSteps } from "./ProgressSteps";
import { StepController } from "./StepController";

const VehicleInsertPage = () => {
  return (
    <div>
      <div className="mx-auto">
        <ProgressSteps />
        <StepController />
      </div>
    </div>
  );
};

export default VehicleInsertPage;
