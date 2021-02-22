import React from 'react';
import { useLoginContext } from './context';

type ValidateProps = {
  validateCallback: () => void
};

/**
 * Validate component
 * contains the Validate Email 'page'.
 */
export const Validate = (props: ValidateProps) => {
  let { validateState } = useLoginContext();

  return (
    <section className="validate">
      <h2 className="validate__header">Validate Email</h2>
      <p className="validate__text">Please enter the details below to validate your account.</p>
      <input type="text" name="code" className="validate__code" placeholder="Validation code" />
      <label className="validate__code-error">{validateState.validateCodeError}</label>
      <label className="validate__code-success">{validateState.success}</label><br />
      <button type="button" className="validate__submit" data-testid="validate-button" onClick={props.validateCallback}>Submit</button>
    </section>
  )
}
