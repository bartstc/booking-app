import { ObjectSchema, setLocale } from 'yup';
import { left, Result, right } from './Result';

setLocale({
  mixed: {
    required: 'should be defined',
    notType: 'invalid type',
    oneOf: 'invalid type',
  },
});

interface DtoErrors {
  [key: string]: string;
}

export class ValidationTransformer {
  static async validateSchema<T extends {}>(dto: T, schema: ObjectSchema<T>) {
    const requiredFieldErrors = await this.validateDto(dto, schema);
    const additionalFieldErrors = this.getAdditionalFieldErrors(dto, schema);
    const errors = { ...requiredFieldErrors, ...additionalFieldErrors };

    if (!errors || Object.keys(errors).length === 0) {
      return right(Result.ok());
    }

    return left(
      Result.fail({
        message: 'validationError',
        error: {
          fields: errors,
        },
      }),
    );
  }

  private static getAdditionalFieldErrors<T extends {}>(
    dto: T,
    schema: ObjectSchema<T>,
  ): DtoErrors {
    const additionalFields = Object.keys(dto).filter(
      field => !Object.keys(schema.fields).includes(field),
    );

    if (!additionalFields.length) return {};

    return additionalFields.reduce((acc, field) => {
      return { ...acc, [field]: 'additionalFieldNotAllowed' };
    }, {});
  }

  private static async validateDto<T extends {}>(
    props: T,
    schema: ObjectSchema<T>,
  ): Promise<DtoErrors | undefined> {
    let errors;

    try {
      await schema.validate(props, { abortEarly: false });
    } catch (err) {
      errors = this.mapErrors(err);
    }

    return errors;
  }

  private static mapErrors(err: any) {
    return err.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message };
    }, {});
  }
}
