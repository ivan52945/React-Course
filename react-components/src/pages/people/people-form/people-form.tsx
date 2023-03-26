import React, { Component, FormEvent } from 'react';
import styles from './people-form.module.css';

import PeopleButton from './people-button/people-button';

type people = {
  name: string;
  male: boolean;
  married: boolean;
};

class PeopleForm extends Component {
  nameRef = React.createRef<HTMLInputElement>();
  maleRef = React.createRef<HTMLInputElement>();
  femaleRef = React.createRef<HTMLInputElement>();
  mariedRef = React.createRef<HTMLInputElement>();

  constructor(props: never) {
    super(props);

    this.submitPerson = this.submitPerson.bind(this);
  }

  submitPerson(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result: people = {
      name: (this.nameRef.current as HTMLInputElement).value,
      male: (this.maleRef.current as HTMLInputElement).checked,
      married: (this.mariedRef.current as HTMLInputElement).checked,
    };

    const name = result.name;

    if (name.length <= 0 || !/^[A-ZА-Я][a-zа-я]+$/.test(name)) {
      console.log('Не введено имя или не с большой буквы');
      return;
    } else if (result.male == this.femaleRef.current?.checked) {
      console.log('Выберите пол');
      return;
    } else {
      console.log(result);
    }
  }

  render() {
    return (
      <form onSubmit={this.submitPerson} className={styles.form}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder={`Please input name`}
            ref={this.nameRef}
          ></input>
        </label>
        <section>
          Sex:
          <label>
            Male:
            <input type="radio" name="sex" value="male" ref={this.maleRef} />
          </label>
          <label>
            Female:
            <input type="radio" name="sex" value="female" ref={this.femaleRef} />
          </label>
        </section>
        <section>
          Maried:
          <input type="checkbox" ref={this.mariedRef}></input>
        </section>
        <section>
          Avatar:
          <input type="file"></input>
        </section>
        <PeopleButton label={'Submit'}></PeopleButton>
      </form>
    );
  }
}

export default PeopleForm;
