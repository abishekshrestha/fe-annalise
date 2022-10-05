import { SyntheticEvent, useState } from "react";

interface IProps {
  handleSubmit?: (firstName: string) => void
  isValid: boolean
}

const FirstPageForm = (props: IProps) => {
  const { handleSubmit, isValid } = props;
  const [firstName, setFirstName] = useState<string>("");

  const onHandleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleSubmit && handleSubmit(firstName)
  };

  return (
    <form data-testid="form" className="first-page container" onSubmit={onHandleSubmit}>
      <label htmlFor="firstName">Enter your first name</label>
      <div className="input-group">
        <input
          className="first-name"
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          aria-label="enter first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <button type="submit">Go to next page</button>
      </div>
      {!isValid && <div className="error">Please enter a name</div>}
    </form>
  );
};

export default FirstPageForm;
