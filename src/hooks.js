export const handle = async ({ event, resolve }) => {
  event.locals.user = "Ali";
  const response = await resolve(event);

  return response;
};

export const getSession = (request) => {
  return {};
};
