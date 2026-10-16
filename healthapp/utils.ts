const isNotNumber = (argument: unknown): boolean =>
  isNaN(Number(argument));

export {isNotNumber};