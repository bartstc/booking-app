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
  static async validateSchema<T extends object>(
    dto: T,
    schema: ObjectSchema<T>,
  ) {
    const errors = await this.validateDto(dto, schema);

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

  private static async validateDto<T extends object>(
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
