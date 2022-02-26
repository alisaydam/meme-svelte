export const handle = async ({ event, resolve }) => {
  event.locals.user = "Ali";
  const response = await resolve(event);

  console.log(event);
  return response;
};

export const getSession = (request) => {
  console.log(request);
  return {};
};
