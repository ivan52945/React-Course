import { SubmitHandler, useForm } from 'react-hook-form';
import React, { FC } from 'react';

import IPeople from '../../../types/people';

import styles from './people-form.module.css';

interface IFormOut {
  name: string;
  birthDate: string;
  sex: 'male' | 'female';
  maried: boolean;
  img: File[];
  preferedAnimal: string;
}

interface IPeopleForm {
  add: (people: IPeople) => void;
}

const fileReadPromise = (file: File) =>
  new Promise<string>((resolve) => {
    const image = new FileReader();

    image.onload = () => {
      resolve(image.result as string);
    };

    image.readAsDataURL(file);
  });

const PeopleForm: FC<IPeopleForm> = ({ add }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormOut>();

  const submit: SubmitHandler<IFormOut> = async (inputs) => {
    const people: IPeople = {
      name: inputs.name,
      birthDate: inputs.birthDate,
      sex: inputs.sex as string,
      maried: inputs.maried,
      img: await fileReadPromise(inputs.img[0]),
      key: Date.now(),
      preferedAnimal: inputs.preferedAnimal,
    };

    reset();

    add(people);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form} role={'people-form'}>
      <label>
        Name:
        <input
          {...register('name', {
            required: true,
            pattern: {
              value: /^[A-ZА-Я][a-zа-я]{2,}$/,
              message:
                'Имя должно начинаться с большой буквы и его длинна должна быть больше 2-х символов',
            },
          })}
          role="people-name-input"
        />
      </label>
      {errors?.name ? errors?.name?.message || (errors?.name && 'Введите имя') : ''}
      <fieldset role="people-sex-radio">
        <legend>Sex</legend>
        <input
          type="radio"
          {...register('sex', { required: true })}
          value="male"
          role="people-sex-radio-male"
        />
        <input
          type="radio"
          {...register('sex', { required: true })}
          value="female"
          role="people-sex-radio-female"
        />
      </fieldset>
      {errors?.sex ? 'Выберите пол' : ''}
      <label>
        Birth Date:{' '}
        <input
          type="date"
          {...register('birthDate', { required: true })}
          role="people-birthday-date"
        />
      </label>
      {errors?.birthDate ? 'Выберите дату рождения' : ''}
      <label>
        Maried: <input type="checkbox" {...register('maried')} role="people-married-check" />
      </label>
      <section>
        Avatar:
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          {...register('img', { required: true })}
          role="people-avatar"
        />
        {errors?.img ? 'Загрузите аватар' : ''}
      </section>
      <select {...register('preferedAnimal', { required: true })}>
        <option value="Haski">Haski</option>
        <option value="Buldog">Buldog</option>
        <option value="Britan Cat">Britan Cat</option>
      </select>
      <button role="people-form-submit">Submit</button>
    </form>
  );
};

export default PeopleForm;
