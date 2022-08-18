const runSchema = (schema: any) => async (value: any) => {
  const result = await schema.validateAsync(value);
  return result;
};

export default runSchema;